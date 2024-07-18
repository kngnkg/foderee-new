import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { setSpotifyClientAccessToken, spotifyClient } from '@/lib/spotify'
import { toReview } from '@/lib/transform/review'
import { apiReviewSchema } from '@/types/api/review'
import { AppError, AppErrorType } from '@/types/error'
import { type Review } from '@/types/review'
import { isSpotifyResponseError } from '@/types/spotify/error'
import { ZodError } from 'zod'

export const getReview = async (reviewId: string): Promise<Review> => {
  try {
    // APIからレビューを取得
    const reviewResp = await serverFetcher(
      `${env.API_URL}/reviews/${reviewId}`,
      {
        cache: 'no-store',
      },
    )

    const review = apiReviewSchema.parse(reviewResp)

    // Spotifyからアルバム情報を取得
    await setSpotifyClientAccessToken(spotifyClient)
    const albumResp = await spotifyClient.getAlbum(review.album_id)
    const album = albumResp.body

    return toReview(review, album)
  } catch (e) {
    if (isSpotifyResponseError(e) && e.statusCode === 404) {
      throw new AppError(
        `アルバムがSpotify上で見つかりません`,
        AppErrorType.SpotifyResourceNotFoundError,
      )
    }

    if (e instanceof ZodError) {
      throw new AppError(
        `APIからのデータが不正です: ${e.message}`,
        AppErrorType.InvalidDataReceivedError,
      )
    }

    throw e
  }
}
