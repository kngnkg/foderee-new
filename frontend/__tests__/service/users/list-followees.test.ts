/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { generateApiUserForTest } from '@/lib/testutil/users'
import { toUser } from '@/lib/transform/user'
import { listFollowees } from '@/service/users/list-followees'
import { AppError, AppErrorType } from '@/types/error'

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
        generateApiUserForTest({ username: '@testuser1' }),
        generateApiUserForTest({ username: '@testuser2' }),
      ],
      offset: 0,
      limit: 2,
      total: 2,
    }

    const expected = {
      users: mockFolloweesData.users.map((u) => toUser(u)),
      offset: 0,
      limit: 2,
      total: 2,
    }

    mockServerFetcher.mockResolvedValueOnce(mockFolloweesData)

    const validUsername = '@validUsername'

    const followees = await listFollowees(validUsername, {
      offset: 0,
      limit: 2,
    })

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/${validUsername}/followees?offset=0&limit=2`,
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

    mockServerFetcher.mockResolvedValueOnce(mockFolloweesData)

    const validUsername = '@validUsername'

    const followees = await listFollowees(validUsername, {
      offset: 0,
      limit: 2,
    })

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/users/${validUsername}/followees?offset=0&limit=2`,
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
    mockServerFetcher.mockRejectedValueOnce(
      new AppError('', AppErrorType.EntityNotFoundError),
    )

    const errObj = await listFollowees('@invalidUsername', {
      offset: 0,
      limit: 2,
    }).catch((e) => e)

    expect(errObj).toBeInstanceOf(AppError)

    expect((errObj as AppError).type).toBe(AppErrorType.EntityNotFoundError)
  })

  it('受け取ったデータが不正な場合はエラーを返す', async () => {
    const mockInvalidData = {
      invalidProperty: 'invalid',
    }
    mockServerFetcher.mockResolvedValueOnce(mockInvalidData)

    const errObj = await listFollowees('@invalidData', {
      offset: 0,
      limit: 2,
    }).catch((e) => e)
    expect(errObj).toBeInstanceOf(AppError)

    expect((errObj as AppError).type).toBe(
      AppErrorType.InvalidDataReceivedError,
    )
  })

  it('その他のエラーの場合はエラーをそのまま返す', async () => {
    const otherError = new Error('other error')
    mockServerFetcher.mockRejectedValueOnce(otherError)

    const errObj = await listFollowees('@invalidError', {
      offset: 0,
      limit: 2,
    }).catch((e) => e)

    expect(errObj).toBe(otherError)
  })
})
