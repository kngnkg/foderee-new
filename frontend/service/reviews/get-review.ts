import { env } from '@/env.mjs'
import getAlbum from '@/service/albums/get-album'
import { toReview } from '@/types/api/review'
import type { Review } from '@/types/review'

export const getReview = async (reviewId: string): Promise<Review | null> => {
  try {
    // APIからレビューを取得
    const resp = await fetch(`${env.API_URL}/reviews/${reviewId}`, {
      cache: 'no-store',
    })

    if (!resp) {
      return null
    }
    if (resp.status !== 200) {
      return null
    }

    const review = await resp.json()

    // Spotifyからアルバム情報を取得
    const album = await getAlbum(review.album_id)

    return toReview(review, album)
  } catch (e) {
    console.error(e)
    return null
  }
}
