import { userFetcher, useUsers } from '@/hooks/users/use-users'
import { clientFetcher } from '@/lib/client-fetcher'
import { generateUserForTest } from '@/lib/testutil/users'
import { transformBffUser, transformUser } from '@/lib/transform/bff-user'
import type { PagedBffUsers } from '@/types/bff/users'
import { AppError, AppErrorType } from '@/types/error'
import { act, renderHook } from '@testing-library/react'
import useSWRInfinite from 'swr/infinite'

jest.mock('@/lib/client-fetcher', () => ({
  clientFetcher: jest.fn(),
}))

jest.mock('swr/infinite', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('userFetcher', () => {
  const mockClientFetcher = clientFetcher as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('ユーザーが存在する場合はユーザーリストを返す', async () => {
    const mockData: PagedBffUsers = {
      users: [
        transformBffUser(generateUserForTest({ username: '@test1' })),
        transformBffUser(generateUserForTest({ username: '@test1' })),
      ],
      offset: 0,
      limit: 10,
      total: 2,
    }
    mockClientFetcher.mockResolvedValue(mockData)

    const resp = await userFetcher('http://example.com/api/users')

    expect(resp).toEqual({
      users: mockData.users.map((user) => transformUser(user)),
      offset: mockData.offset,
      limit: mockData.limit,
      total: mockData.total,
    })
  })

  it('ユーザーが0人の場合は空のユーザーリストを返す', async () => {
    const mockData: PagedBffUsers = {
      users: [],
      offset: 0,
      limit: 10,
      total: 0,
    }
    mockClientFetcher.mockResolvedValue(mockData)

    const resp = await userFetcher('http://example.com/api/users')

    expect(resp).toEqual({
      users: [],
      offset: mockData.offset,
      limit: mockData.limit,
      total: mockData.total,
    })
  })

  it('受け取ったデータが不正な場合はエラーを投げる', async () => {
    const mockInvalidData = { users: [] }
    mockClientFetcher.mockResolvedValue(mockInvalidData)

    const errObj = await userFetcher('http://example.com/api/users').catch(
      (e) => e,
    )

    expect(errObj).toBeInstanceOf(AppError)
    expect((errObj as AppError).type).toBe(
      AppErrorType.InvalidDataReceivedError,
    )
  })

  it('その他のエラーの場合はエラーをそのまま投げる', async () => {
    const otherError = new Error('error')
    mockClientFetcher.mockRejectedValue(otherError)

    const errObj = await userFetcher('http://example.com/api/users').catch(
      (e) => e,
    )

    expect(errObj).toEqual(otherError)
  })
})

describe('useUsers', () => {
  const mockUseSWRInfinite = useSWRInfinite as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('初期状態のstateを正しく返す', async () => {
    mockUseSWRInfinite.mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      size: 0,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() =>
      useUsers({ endpoint: 'http://example.com/api/users' }),
    )

    expect(result.current).toEqual({
      pagedUsersList: undefined,
      error: undefined,
      isLoading: true,
      isLoadingMore: true,
      isReachingEnd: false,
      isValidating: false,
      loadMore: expect.any(Function),
    })
  })

  it('loadMoreが呼ばれると次のページを取得する', async () => {
    const setSizeMock = jest.fn()

    mockUseSWRInfinite.mockReturnValue({
      data: [
        { users: [generateUserForTest()], offset: 2, limit: 10, total: 20 },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
      size: 1,
      setSize: setSizeMock,
    })

    const { result } = renderHook(() =>
      useUsers({ endpoint: 'http://example.com/api/users' }),
    )

    expect(result.current.isLoadingMore).toBe(false)
    expect(result.current.isReachingEnd).toBe(false)

    act(() => {
      result.current.loadMore()
    })

    expect(setSizeMock).toHaveBeenCalledWith(2)
  })

  it('全てのページを取得した場合にisReachingEndがtrueになる', async () => {
    mockUseSWRInfinite.mockReturnValue({
      data: [{ users: [], offset: 2, limit: 10, total: 2 }],
      error: undefined,
      isLoading: false,
      isValidating: false,
      size: 2,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() =>
      useUsers({ endpoint: 'http://example.com/api/users' }),
    )

    expect(result.current.isReachingEnd).toBe(true)
  })

  it('エラーを正しくハンドリングする', async () => {
    const mockError = new Error('mock error')

    mockUseSWRInfinite.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      size: 0,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() =>
      useUsers({ endpoint: 'http://example.com/api/users' }),
    )

    expect(result.current.error).toBe(mockError)
    expect(result.current.isLoading).toBe(false)
  })
})
