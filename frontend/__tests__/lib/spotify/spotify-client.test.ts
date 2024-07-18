/**
 * @jest-environment node
 */

import { SpotifyClient } from '@/lib/spotify/spotify-client'
import { generateSpotifySingleAlbumResponseForTest } from '@/lib/testutil/albums'
import { AppError, AppErrorType } from '@/types/error'

jest.mock('@/env.mjs', () => ({
  env: {
    SPOTIFY_CLIENT_ID: 'client_id',
    SPOTIFY_CLIENT_SECRET: 'client_secret',
  },
}))

global.fetch = jest.fn()

describe('spotifyClient', () => {
  const mockFetch = global.fetch as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('setAccessToken', () => {
    it('トークンが正しくセットされる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      const mockResp = {
        ok: true,
        body: {
          access_token: 'mocked_access_token',
          token_type: 'bearer',
          expires_in: 3600,
        },
        json() {
          return Promise.resolve(this.body)
        },
      }
      mockFetch.mockResolvedValueOnce(mockResp)

      await spotifyClient.setAccessToken()

      expect(spotifyClient.accessToken).toBe(mockResp.body.access_token)
      expect(spotifyClient.tokenExpiresIn).toBe(mockResp.body.expires_in)
      expect(spotifyClient.lastTokenFetchTime).toBeInstanceOf(Date)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from('client_id' + ':' + 'client_secret').toString(
                'base64',
              ),
          },
          cache: 'no-store',
        },
      )
    })

    it('トークン取得時にエラーが発生した場合はエラーを投げる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      const mockResp = {
        ok: false,
        body: {},
      }
      mockFetch.mockResolvedValue(mockResp)

      const errObj = await spotifyClient.setAccessToken().catch((e) => e)

      expect(errObj).toBeInstanceOf(AppError)
      expect((errObj as AppError).type).toBe(
        AppErrorType.SpotifyTokenCannotRetrieveError,
      )
    })

    it('受け取ったデータが不正な場合はエラーを投げる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      const mockResp = {
        ok: true,
        body: {
          invalidProperty: 'invalid',
        },
        json() {
          return Promise.resolve(this.body)
        },
      }
      mockFetch.mockResolvedValueOnce(mockResp)

      const errObj = await spotifyClient.setAccessToken().catch((e) => e)

      expect(errObj).toBeInstanceOf(AppError)
      expect((errObj as AppError).type).toBe(
        AppErrorType.InvalidDataReceivedError,
      )
    })

    it('その他のエラーの場合はエラーをそのまま投げる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      const otherError = new Error('other error')
      mockFetch.mockRejectedValueOnce(otherError)

      const errObj = await spotifyClient.setAccessToken().catch((e) => e)

      expect(errObj).toBe(otherError)
    })
  })

  describe('getAlbum', () => {
    it('アルバムが正しく取得できる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      spotifyClient.setAccessToken = jest.fn()
      const mockSetAccessToken = spotifyClient.setAccessToken as jest.Mock
      mockSetAccessToken.mockResolvedValueOnce({})
      const mockResp = {
        ok: true,
        body: generateSpotifySingleAlbumResponseForTest(),
        json() {
          return Promise.resolve(this.body)
        },
      }
      mockFetch.mockResolvedValueOnce(mockResp)

      const validId = '2up3OPMp9Tb4dAKM2erWXQ'

      const resp = await spotifyClient.getAlbum(validId)

      expect(resp).toEqual(mockResp.body)
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.spotify.com/v1/albums/${validId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${spotifyClient.accessToken}`,
          },
          next: { revalidate: 3600 },
        },
      )
    })

    it('アルバムが存在しない場合はエラーを投げる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      spotifyClient.setAccessToken = jest.fn()
      const mockSetAccessToken = spotifyClient.setAccessToken as jest.Mock
      mockSetAccessToken.mockResolvedValueOnce({})
      const mockResp = {
        ok: false,
        body: {
          error: {
            status: 404,
            message: 'album not found',
          },
        },
        json() {
          return Promise.resolve(this.body)
        },
      }
      mockFetch.mockResolvedValueOnce(mockResp)

      const notExistsId = '4Z8W4fKeB5YxbusRsdQVPP'

      const errObj = await spotifyClient.getAlbum(notExistsId).catch((e) => e)

      expect(errObj).toBeInstanceOf(AppError)
      expect((errObj as AppError).type).toBe(
        AppErrorType.SpotifyResourceNotFoundError,
      )
    })

    it('その他のエラーの場合はエラーをそのまま投げる', async () => {
      const spotifyClient = new SpotifyClient({
        clientId: 'client_id',
        clientSecret: 'client_secret',
      })
      spotifyClient.setAccessToken = jest.fn()
      const mockSetAccessToken = spotifyClient.setAccessToken as jest.Mock
      mockSetAccessToken.mockResolvedValueOnce({})
      const otherError = new Error('other error')
      mockFetch.mockRejectedValueOnce(otherError)

      const validId = '2up3OPMp9Tb4dAKM2erWXQ'

      const errObj = await spotifyClient.getAlbum(validId).catch((e) => e)

      expect(errObj).toBe(otherError)
    })
  })
})
