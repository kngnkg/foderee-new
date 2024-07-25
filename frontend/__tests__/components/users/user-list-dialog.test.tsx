import { UserListDialog } from '@/components/users/user-list-dialog'
import { useUsers } from '@/hooks/users/use-users'
import { generateUserForTest } from '@/lib/testutil/users'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

jest.mock('@/hooks/users/use-users', () => ({
  useUsers: jest.fn(),
}))

jest.mock('@/env.mjs', () => ({
  env: {
    API_URL: 'http://example.com/api',
  },
}))

describe('UserListDialog', () => {
  const mockUseUsers = useUsers as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('与えられたタイプをもとに正しくレンダリングされる', async () => {
    mockUseUsers.mockReturnValue({
      pagedUsersList: [],
      error: undefined,
      isLoading: false,
      isLoadingMore: undefined,
      isReachingEnd: false,
      isValidating: false,
      loadMore: jest.fn(),
    })
    const mockUser = generateUserForTest()

    render(<UserListDialog type="followers" user={mockUser} />)

    // ダイアログトリガーが表示されているかチェック
    expect(
      screen.getByText(`${mockUser.followersCount} フォロワー`),
    ).toBeInTheDocument()
  })

  it('トリガーをクリックするとダイアログが開く', async () => {
    mockUseUsers.mockReturnValue({
      pagedUsersList: null,
      error: null,
      isLoading: false,
      isLoadingMore: undefined,
      isReachingEnd: false,
      loadMore: jest.fn(),
    })
    const mockUser = generateUserForTest()

    render(<UserListDialog type="followers" user={mockUser} />)

    // ダイアログトリガーをクリック
    fireEvent.click(screen.getByText(`${mockUser.followersCount} フォロワー`))

    // ダイアログが開くのを待つ
    await waitFor(() => {
      expect(screen.getByText('フォロワー')).toBeInTheDocument()
    })
  })

  it('データがロードされるとユーザーリストを表示する', async () => {
    const mockUser = generateUserForTest()
    const mockPagedUsersList = [
      {
        users: [generateUserForTest()],
        offset: 0,
        limit: 10,
        total: 1,
      },
    ]

    mockUseUsers.mockReturnValue({
      pagedUsersList: mockPagedUsersList,
      error: null,
      isLoading: false,
      isLoadingMore: false,
      isReachingEnd: false,
      loadMore: jest.fn(),
    })

    render(<UserListDialog type="followers" user={mockUser} />)

    // ダイアログトリガーをクリック
    fireEvent.click(screen.getByText(`${mockUser.followersCount} フォロワー`))

    // ユーザーリストが表示されているかチェック
    await waitFor(() => {
      expect(
        screen.getByText(mockPagedUsersList[0].users[0].displayName),
      ).toBeInTheDocument()
    })
  })

  it('エラーが発生した場合はエラーメッセージを表示する', async () => {
    const mockUser = generateUserForTest()
    mockUseUsers.mockReturnValue({
      pagedUsersList: null,
      error: new Error('Failed to fetch'),
      isLoading: false,
      isLoadingMore: undefined,
      isReachingEnd: false,
      loadMore: jest.fn(),
    })

    render(<UserListDialog type="followers" user={mockUser} />)

    // ダイアログトリガーをクリック
    fireEvent.click(screen.getByText(`${mockUser.followersCount} フォロワー`))

    // エラーメッセージが表示されるのを待つ
    await waitFor(() => {
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
    })
  })
})
