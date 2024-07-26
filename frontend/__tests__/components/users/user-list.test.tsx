import { UserList } from '@/components/users/user-list'
import { generateUserForTest } from '@/lib/testutil/users'
import type { PagedUsers } from '@/types/user'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('UserList', () => {
  it('与えられたpagedUsersListをもとに正しくレンダリングされる', async () => {
    const mockData: PagedUsers[] = [
      {
        users: [
          generateUserForTest({ username: '@test1', displayName: 'test1' }),
          generateUserForTest({ username: '@test2', displayName: 'test2' }),
        ],
        offset: 0,
        limit: 10,
        total: 2,
      },
      {
        users: [
          generateUserForTest({ username: '@test3', displayName: 'test3' }),
          generateUserForTest({ username: '@test4', displayName: 'test4' }),
        ],
        offset: 0,
        limit: 10,
        total: 2,
      },
    ]

    render(<UserList pagedUsersList={mockData} />)

    mockData.forEach((pagedUsers) => {
      pagedUsers.users.forEach((user) => {
        // 各ユーザーの名前が正しく表示されているかチェック
        expect(screen.getByText(user.displayName)).toBeInTheDocument()
      })
    })
  })

  it('pagedUsersListが空の場合は何も表示しない', async () => {
    const mockData: PagedUsers[] = []

    render(<UserList pagedUsersList={mockData} />)

    expect(screen.queryByRole('list')).toBeNull()
  })

  it('classNameが正しく適用される', async () => {
    const mockData: PagedUsers[] = [
      {
        users: [
          generateUserForTest({ username: '@test1', displayName: 'test1' }),
          generateUserForTest({ username: '@test2', displayName: 'test2' }),
        ],
        offset: 0,
        limit: 10,
        total: 2,
      },
      {
        users: [
          generateUserForTest({ username: '@test3', displayName: 'test3' }),
          generateUserForTest({ username: '@test4', displayName: 'test4' }),
        ],
        offset: 0,
        limit: 10,
        total: 2,
      },
    ]

    const className = 'custom-class'
    const { container } = render(
      <UserList pagedUsersList={mockData} className={className} />,
    )
    expect(container.firstChild).toHaveClass(className)
  })
})
