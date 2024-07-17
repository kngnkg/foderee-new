import { toAlbum } from '@/lib/transform/album'
import { toUser } from '@/lib/transform/user'
import type { ApiReview } from '@/types/api/review'
import type { Review } from '@/types/review'

export function toReview(
  apiReview: ApiReview,
  apiAlbum: SpotifyApi.SingleAlbumResponse,
): Review {
  return {
    reviewId: apiReview.review_id,
    publishedStatus: apiReview.published_status,
    album: toAlbum(apiAlbum),
    user: toUser(apiReview.user),
    title: apiReview.title,
    content: apiReview.content,
    likesCount: apiReview.likes_count,
    createdAt: new Date(apiReview.created_at),
    updatedAt: new Date(apiReview.updated_at),
  }
}
