import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { setSpotifyClientAccessToken, spotifyClient } from '@/lib/spotify'
import { toReview } from '@/lib/transform/review'
import { ApiErrorType, isApiError } from '@/types/api/error'
import { isApiReview } from '@/types/api/review'
import {
  EntityNotFoundError,
  SpotifyResourceNotFoundError,
} from '@/types/error'
import { type Review } from '@/types/review'
import { isSpotifyResponseError } from '@/types/spotify/error'

export const getReview = async (reviewId: string): Promise<Review> => {
  try {
    // APIからレビューを取得
    const reviewResp = await serverFetcher(
      `${env.API_URL}/reviews/${reviewId}`,
      {
        cache: 'no-store',
      },
    )

    if (!isApiReview(reviewResp)) {
      if (!isApiError(reviewResp)) {
        throw new Error('エラーレスポンスの形式が不正です')
      }

      if (reviewResp.type === ApiErrorType.EntityNotFound) {
        throw new EntityNotFoundError(`レビュー${reviewId}が存在しません`)
      }

      throw new Error(
        `APIリクエスト中にエラーが発生しました: ${reviewResp.type} ,${reviewResp.message}`,
      )
    }

    // Spotifyからアルバム情報を取得
    await setSpotifyClientAccessToken(spotifyClient)
    const albumResp = await spotifyClient.getAlbum(reviewResp.album_id)
    const album = albumResp.body

    return toReview(reviewResp, album)
  } catch (e) {
    if (isSpotifyResponseError(e) && e.statusCode === 404) {
      throw new SpotifyResourceNotFoundError(
        `アルバムがSpotify上で見つかりません`,
      )
    }

    throw e
  }
}
