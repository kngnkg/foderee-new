import { env } from '@/env.mjs'
import { isTokenExpired } from '@/lib/is-token-expired'
import { AppError, AppErrorType } from '@/types/error'
import { spotifyErrorSchema } from '@/types/spotify/error'
import { spotifyTokenSchema } from '@/types/spotify/token'
import { ZodError } from 'zod'

interface credential {
  clientId: string
  clientSecret: string
}

export class SpotifyClient {
  private readonly _clientId: string
  private readonly _clientSecret: string
  private readonly _baseUrl = 'https://api.spotify.com/v1'
  private _accessToken = ''
  private _tokenExpiresIn = 0
  private _lastTokenFetchTime?: Date

  constructor(credential: credential) {
    this._clientId = credential.clientId
    this._clientSecret = credential.clientSecret
  }

  get accessToken(): string {
    return this._accessToken
  }
  get tokenExpiresIn(): number {
    return this._tokenExpiresIn
  }
  get lastTokenFetchTime(): Date | undefined {
    return this._lastTokenFetchTime
  }

  async setAccessToken(): Promise<void> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(this._clientId + ':' + this._clientSecret).toString(
              'base64',
            ),
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        console.log(JSON.stringify(response))
        throw new AppError(
          `Spotify トークンが取得できませんでした: ${JSON.stringify(response)}`,
          AppErrorType.SpotifyTokenCannotRetrieveError,
        )
      }

      const data = await response.json()

      const token = spotifyTokenSchema.parse(data)

      this._accessToken = token.access_token
      this._tokenExpiresIn = token.expires_in
      this._lastTokenFetchTime = new Date()
    } catch (e) {
      if (e instanceof ZodError) {
        throw new AppError(
          `Spotify APIからのデータが不正です: ${e.message}`,
          AppErrorType.InvalidDataReceivedError,
        )
      }

      throw e
    }
  }

  async getAlbum(albumId: string): Promise<SpotifyApi.SingleAlbumResponse> {
    try {
      const data = await this._executeRequest(
        `${this._baseUrl}/albums/${albumId}`,
        {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + this.accessToken },
          next: { revalidate: 3600 },
        },
      )

      return data as SpotifyApi.SingleAlbumResponse
    } catch (e) {
      throw e
    }
  }

  private async _executeRequest(
    resource: RequestInfo,
    init: RequestInit,
    retryCount = 0,
  ): Promise<unknown> {
    const MAX_RETRY_COUNT = 3

    try {
      // トークン未取得またはトークンが有効期限切れの場合はトークンを取得
      if (
        !this._lastTokenFetchTime ||
        isTokenExpired(this._tokenExpiresIn, this._lastTokenFetchTime)
      ) {
        await this.setAccessToken()
        init.headers = { Authorization: 'Bearer ' + this.accessToken }
      }

      const res = await fetch(resource, init)

      if (!res.ok) {
        // TODO: ネットワークエラー時の処理
        const data = await res.json()
        const errRes = spotifyErrorSchema.parse(data)

        switch (errRes.error.status) {
          case 401:
            if (errRes.error.message === 'The access token expired') {
              await this.setAccessToken()

              // リトライ
              if (retryCount <= MAX_RETRY_COUNT) {
                return await this._executeRequest(
                  resource,
                  init,
                  retryCount + 1,
                )
              }

              throw new AppError(
                'リトライ回数が上限に達しました。',
                AppErrorType.RetryLimitExceededError,
              )
            }

            break
          case 404:
            throw new AppError(
              errRes.error.message,
              AppErrorType.SpotifyResourceNotFoundError,
            )
          case 429:
            throw new AppError(
              errRes.error.message,
              AppErrorType.SpotifyRateLimitError,
            )
          default:
            throw new AppError(
              `Spotify APIエラー: ${JSON.stringify(errRes)}`,
              AppErrorType.SpotifyError,
            )
        }

        throw new AppError(
          `Spotify APIエラー: ${JSON.stringify(errRes)}`,
          AppErrorType.SpotifyError,
        )
      }

      const data = await res.json()
      return data
    } catch (e) {
      throw e
    }
  }
}

export const spotifyClient = new SpotifyClient({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
})
