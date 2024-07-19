import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { spotifyClient } from '@/lib/spotify/spotify-client'
import { toReview } from '@/lib/transform/review'
import { apiReviewSchema } from '@/types/api/review'
import { AppError, AppErrorType } from '@/types/error'
import { type Review } from '@/types/review'
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
    const album = await spotifyClient.getAlbum(review.album_id)

    return toReview(review, album)
  } catch (e) {
    if (e instanceof ZodError) {
      throw new AppError(
        `APIからのデータが不正です: ${e.message}`,
        AppErrorType.InvalidDataReceivedError,
      )
    }

    throw e
  }
}
