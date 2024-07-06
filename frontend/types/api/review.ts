import { toAlbum } from '@/lib/spotify'
import { apiUserSchema, toUser } from '@/types/api/user'
import { isReview, type Review } from '@/types/review'
import { z } from 'zod'

export const apiReviewSchema = z.object({
  review_id: z.string().uuid(),
  published_status: z.string(),
  album_id: z.string(),
  user: apiUserSchema,
  title: z.string(),
  content: z.any(),
  likes_count: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type ApiReview = z.infer<typeof apiReviewSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiReview(obj: any): obj is ApiReview {
  return apiReviewSchema.safeParse(obj).success
}

export function toReview(
  apiReview: ApiReview,
  apiAlbum: SpotifyApi.SingleAlbumResponse,
): Review {
  const review = {
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

  if (!isReview(review)) {
    throw new Error(`Invalid review data: ${review}`)
  }
  return review
}
