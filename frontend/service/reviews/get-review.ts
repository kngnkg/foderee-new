import { env } from '@/env.mjs'
import getAlbum from '@/lib/spotify/get-album'
import { serverFetcher } from '@/lib/utils'
import { toReview } from '@/types/api/review'
import { isReview, type Review } from '@/types/review'

export const getReview = async (reviewId: string): Promise<Review | null> => {
  try {
    // APIからレビューを取得
    const review = await serverFetcher(`${env.API_URL}/reviews/${reviewId}`, {
      cache: 'no-store',
    })
    if (isReview(review)) {
      throw new Error(`Invalid review data: ${review}`)
    }

    // Spotifyからアルバム情報を取得
    const album = await getAlbum(review.album_id)

    return toReview(review, album)
  } catch (e) {
    console.error(e)
    return null
  }
}
