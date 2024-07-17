/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { generateApiUserForTest } from '@/lib/testutil/users'
import { toUser } from '@/lib/transform/user'
import { getUser } from '@/service/users/get-user'
import { EntityNotFoundError, InvalidDataReceivedError } from '@/types/error'

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
    const validUsername = '@validUsername'
    const mockUserData = generateApiUserForTest({ username: validUsername })

    const expected = toUser(mockUserData)

    mockServerFetcher.mockResolvedValueOnce(mockUserData)

    const user = await getUser(validUsername)

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/${validUsername}`,
      { cache: 'no-store' },
    )
    expect(user).toEqual(expected)
  })

  it('ユーザーが存在しない場合はエラーを返す', async () => {
    mockServerFetcher.mockRejectedValueOnce(new EntityNotFoundError(''))

    const invalidUsername = '@invalidUsername'

    await expect(getUser(invalidUsername)).rejects.toThrow(EntityNotFoundError)

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/${invalidUsername}`,
      {
        cache: 'no-store',
      },
    )
  })

  it('受け取ったデータが不正な場合はエラーを返す', async () => {
    const mockInvalidData = {
      invalidProperty: 'invalid',
    }
    mockServerFetcher.mockResolvedValueOnce(mockInvalidData)

    await expect(getUser('@invalidData')).rejects.toThrow(
      InvalidDataReceivedError,
    )
  })

  it('その他のエラーの場合はエラーをそのまま返す', async () => {
    const otherError = new Error('other error')
    mockServerFetcher.mockRejectedValueOnce(otherError)

    await expect(getUser('@invalidError')).rejects.toThrow(otherError)
  })
})
