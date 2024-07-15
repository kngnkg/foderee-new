/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { toExpectedUser } from '@/lib/test-utils'
import { listFollowees } from '@/service/users/list-followees'
import { ApiErrorType } from '@/types/api/error'
import { EntityNotFoundError } from '@/types/error'

jest.mock('@/lib/server-fetcher', () => ({
  serverFetcher: jest.fn(),
}))

jest.mock('@/env.mjs', () => ({
  env: {
    API_URL: 'http://example.com/api',
  },
}))

describe('listFollowees', () => {
  const mockServerFetcher = serverFetcher as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('フォローユーザーが存在する場合はフォローユーザーリストを返す', async () => {
    const mockFolloweesData = {
      users: [
        {
          username: 'testuser1',
          immutable_id: 'e5822d84-9119-4caa-ad96-a4c6ebdaa8a7',
          display_name: 'Test User1',
          avatar_url: 'http://example.com/avatar1.jpg',
          bio: 'Hello, World!1',
          followers_count: 10,
          following_count: 20,
          created_at: '2021-01-01T00:00:00Z',
          updated_at: '2021-01-01T00:00:00Z',
        },
        {
          username: 'testuser2',
          immutable_id: 'e5822d84-9119-4caa-ad96-a4c6ebdaa8a8',
          display_name: 'Test User2',
          avatar_url: 'http://example.com/avatar2.jpg',
          bio: 'Hello, World!2',
          followers_count: 11,
          following_count: 21,
          created_at: '2021-01-01T00:00:00Z',
          updated_at: '2021-01-01T00:00:00Z',
        },
      ],
      offset: 0,
      limit: 2,
      total: 2,
    }

    const expected = {
      users: mockFolloweesData.users.map((u) => toExpectedUser(u)),
      offset: 0,
      limit: 2,
      total: 2,
    }

    mockServerFetcher.mockResolvedValue(mockFolloweesData)

    const followees = await listFollowees('validUsername', {
      offset: 0,
      limit: 2,
    })

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/validUsername/followees?limit=2`,
      { cache: 'no-store' },
    )
    expect(followees).toEqual(expected)
  })

  it('フォローユーザーが0人の場合は空のユーザーリストを返す', async () => {
    const mockFolloweesData = {
      users: [],
      offset: 0,
      limit: 2,
      total: 0,
    }

    mockServerFetcher.mockResolvedValue(mockFolloweesData)

    const followees = await listFollowees('validUsername', {
      offset: 0,
      limit: 2,
    })

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/validUsername/followees?limit=2`,
      { cache: 'no-store' },
    )

    const expected = {
      users: [],
      offset: 0,
      limit: 2,
      total: 0,
    }

    expect(followees).toEqual(expected)
  })

  it('ユーザーが存在しない場合はエラーを返す', async () => {
    const mockEntityNotFoundErrorData = {
      message: 'Entity not found',
      type: ApiErrorType.EntityNotFound,
    }
    mockServerFetcher.mockResolvedValue(mockEntityNotFoundErrorData)

    await expect(
      listFollowees('invalidUsername', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow(EntityNotFoundError)
  })

  it('その他のエラーレスポンスの場合はエラータイプとエラーメッセージを含むエラーを返す', async () => {
    const mockOtherErrorData = {
      message: 'Other error',
      type: ApiErrorType.Unauthorized,
    }
    mockServerFetcher.mockResolvedValue(mockOtherErrorData)

    await expect(
      listFollowees('otherError', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow(
      `APIリクエスト中にエラーが発生しました: ${mockOtherErrorData.type} ,${mockOtherErrorData.message}`,
    )
  })

  it('エラーレスポンスの形式が不正な場合はエラーを返す', async () => {
    const mockInvalidErrorData = {
      message: 'Invalid error response',
    }
    mockServerFetcher.mockResolvedValue(mockInvalidErrorData)

    await expect(
      listFollowees('otherError', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow('エラーレスポンスの形式が不正です')
  })
})
