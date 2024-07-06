import { env } from '@/env.mjs'
import { setSpotifyClientAccessToken, spotifyClient } from '@/lib/spotify'
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
    await setSpotifyClientAccessToken(spotifyClient)
    const resp = await spotifyClient.getAlbum(review.album_id)
    const album = resp.body

    return toReview(review, album)
  } catch (e) {
    console.error(e)
    return null
  }
}
