/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { generateApiUserForTest } from '@/lib/testutil/users'
import { toUser } from '@/lib/transform/user'
import { getUser } from '@/service/users/get-user'
import { AppError, AppErrorType } from '@/types/error'

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
    mockServerFetcher.mockRejectedValueOnce(
      new AppError('', AppErrorType.EntityNotFoundError),
    )
    const invalidUsername = '@invalidUsername'

    const errObj = await getUser(invalidUsername).catch((e) => e)

    expect(errObj).toBeInstanceOf(AppError)

    expect((errObj as AppError).type).toBe(AppErrorType.EntityNotFoundError)

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
    const errObj = await getUser('@invalidData').catch((e) => e)

    expect(errObj).toBeInstanceOf(AppError)

    expect((errObj as AppError).type).toBe(
      AppErrorType.InvalidDataReceivedError,
    )

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/@invalidData`,
      { cache: 'no-store' },
    )
  })

  it('その他のエラーの場合はエラーをそのまま返す', async () => {
    const otherError = new Error('other error')
    mockServerFetcher.mockRejectedValueOnce(otherError)

    const errObj = await getUser('@invalidError').catch((e) => e)

    expect(errObj).toBe(otherError)
  })
})
