/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { toExpectedUser } from '@/lib/test-utils'
import { getUser } from '@/service/users/get-user'
import { ApiErrorType } from '@/types/api/error'
import type { ApiUser } from '@/types/api/user'
import { EntityNotFoundError } from '@/types/error'

jest.mock('@/lib/server-fetcher', () => ({
  serverFetcher: jest.fn(),
}))

jest.mock('@/env.mjs', () => ({
  env: {
    API_URL: 'http://example.com/api',
  },
}))

describe('getUser', () => {
  const mockServerFetcher = serverFetcher as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('ユーザーが存在する場合はユーザーデータを返す', async () => {
    const mockUserData: ApiUser = {
      username: 'testuser',
      immutable_id: 'e5822d84-9119-4caa-ad96-a4c6ebdaa8a7',
      display_name: 'Test User',
      avatar_url: 'http://example.com/avatar.jpg',
      bio: 'Hello, World!',
      followers_count: 10,
      following_count: 20,
      created_at: '2021-01-01T00:00:00Z',
      updated_at: '2021-01-01T00:00:00Z',
    }

    const expected = toExpectedUser(mockUserData)

    mockServerFetcher.mockResolvedValue(mockUserData)

    const user = await getUser('validUsername')

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/validUsername`,
      { cache: 'no-store' },
    )
    expect(user).toEqual(expected)
  })

  it('ユーザーが存在しない場合はエラーを返す', async () => {
    const mockEntityNotFoundErrorData = {
      message: 'Entity not found',
      type: ApiErrorType.EntityNotFound,
    }
    mockServerFetcher.mockResolvedValue(mockEntityNotFoundErrorData)

    await expect(getUser('invalidUsername')).rejects.toThrow(
      EntityNotFoundError,
    )

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/invalidUsername`,
      { cache: 'no-store' },
    )
  })

  it('その他のエラーレスポンスの場合はエラータイプとエラーメッセージを含むエラーを返す', async () => {
    const mockOtherErrorData = {
      message: 'Other error',
      type: ApiErrorType.Unauthorized,
    }
    mockServerFetcher.mockResolvedValue(mockOtherErrorData)

    await expect(getUser('otherError')).rejects.toThrow(
      `APIリクエスト中にエラーが発生しました: ${mockOtherErrorData.type} ,${mockOtherErrorData.message}`,
    )
  })

  it('エラーレスポンスの形式が不正な場合はエラーを返す', async () => {
    const mockInvalidErrorData = {
      message: 'Invalid error response',
    }
    mockServerFetcher.mockResolvedValue(mockInvalidErrorData)

    await expect(getUser('invalidError')).rejects.toThrow(
      'エラーレスポンスの形式が不正です',
    )
  })
})
