/**
 * @jest-environment node
 */

import { errResponse, handleError } from '@/app/api/response'
import { GET } from '@/app/api/users/[username]/followees/route'
import { generateUserForTest } from '@/lib/testutil/users'
import { transformBffUser } from '@/lib/transform/bff-user'
import { listFollowees } from '@/service/users/list-followees'
import { BffErrorResponseType } from '@/types/bff/error-response'
import { AppError, AppErrorType } from '@/types/error'
import { NextRequest } from 'next/server'

jest.mock('@/service/users/list-followees', () => ({
  listFollowees: jest.fn(),
}))

jest.mock('@/app/api/response', () => {
  return {
    handleError: jest.fn(),
    errResponse: jest.fn(),
  }
})

describe('/api/users/[username]/followees', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    const mockListFollowees = listFollowees as jest.Mock
    const mockHandleError = handleError as jest.Mock
    const mockErrResponse = errResponse as jest.Mock

    it('ユーザーにフォローユーザーが存在する場合はステータスコード200とユーザーリストを返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/users/@testUser/followees?q=foo',
      )
      const routeContext = {
        params: {
          username: '@testUser',
        },
      }
      const mockUserData = {
        users: [
          generateUserForTest({ username: '@testUser1' }),
          generateUserForTest({ username: '@testUser2' }),
        ],
        offset: 0,
        limit: 20,
        total: 2,
      }
      mockListFollowees.mockResolvedValueOnce(mockUserData)
      const expected = {
        users: mockUserData.users.map((user) => transformBffUser(user)),
        offset: 0,
        limit: 20,
        total: 2,
      }

      const response = await GET(request, routeContext)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('ユーザーにフォローユーザーが存在しない場合はステータスコード200と空のユーザーリストを返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/users/@testUser/followees?q=foo',
      )
      const routeContext = {
        params: {
          username: '@testUser',
        },
      }
      const mockUserData = {
        users: [],
        offset: 0,
        limit: 20,
        total: 0,
      }
      mockListFollowees.mockResolvedValueOnce(mockUserData)
      const expected = {
        users: [],
        offset: 0,
        limit: 20,
        total: 0,
      }

      const response = await GET(request, routeContext)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('ユーザー名が不正な場合はerrResponseが呼ばれる', async () => {
      const request = new NextRequest(
        'https://example.com/api/users/%5Busername%5D/followees?q=foo',
      )
      const routeContext = {
        params: {
          username: '%5Busername%5D',
        },
      }

      await GET(request, routeContext)

      expect(mockErrResponse).toHaveBeenCalledWith(
        'Invalid username',
        BffErrorResponseType.BadRequest,
      )
    })

    it('ユーザーが存在しない場合はerrResponseが呼ばれる', async () => {
      const request = new NextRequest(
        'https://example.com/api/users/@testUser/followees?q=foo',
      )
      const routeContext = {
        params: {
          username: '@testUser',
        },
      }
      const errObj = new AppError('', AppErrorType.EntityNotFoundError)
      mockListFollowees.mockRejectedValueOnce(errObj)

      await GET(request, routeContext)

      expect(mockErrResponse).toHaveBeenCalledWith(
        'User not found',
        BffErrorResponseType.EntityNotFound,
      )
    })

    it('その他のエラーが発生した場合はhandleErrorが呼ばれる', async () => {
      const request = new NextRequest(
        'https://example.com/api/users/@testUser/followees?q=foo',
      )
      const routeContext = {
        params: {
          username: '@testUser',
        },
      }
      const errObj = new Error('error')
      mockListFollowees.mockRejectedValueOnce(errObj)

      await GET(request, routeContext)

      expect(mockHandleError).toHaveBeenCalledWith(errObj)
    })
  })
})
