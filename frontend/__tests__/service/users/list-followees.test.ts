/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { generateApiUserForTest } from '@/lib/testutil/users'
import { toUser } from '@/lib/transform/user'
import { listFollowees } from '@/service/users/list-followees'
import { EntityNotFoundError, InvalidDataReceivedError } from '@/types/error'

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
      `${env.API_URL}/users/${validUsername}/followees?limit=2`,
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
      `${env.API_URL}/users/${validUsername}/followees?limit=2`,
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
    mockServerFetcher.mockRejectedValueOnce(new EntityNotFoundError(''))

    await expect(
      listFollowees('@invalidUsername', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow(EntityNotFoundError)
  })

  it('受け取ったデータが不正な場合はエラーを返す', async () => {
    const mockInvalidData = {
      invalidProperty: 'invalid',
    }
    mockServerFetcher.mockResolvedValueOnce(mockInvalidData)

    await expect(
      listFollowees('@invalidData', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow(InvalidDataReceivedError)
  })

  it('その他のエラーの場合はエラーをそのまま返す', async () => {
    const otherError = new Error('other error')
    mockServerFetcher.mockRejectedValueOnce(otherError)

    await expect(
      listFollowees('@invalidError', {
        offset: 0,
        limit: 2,
      }),
    ).rejects.toThrow(otherError)
  })
})
