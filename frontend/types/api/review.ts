import { albumIdSchema } from '@/types/album'
import { apiUserSchema } from '@/types/api/user'
import {
  publishedStatusSchema,
  reviewContentSchema,
  reviewIdSchema,
  reviewTitleSchema,
} from '@/types/review'
import { z } from 'zod'

export const apiReviewSchema = z.object({
  review_id: reviewIdSchema,
  published_status: publishedStatusSchema,
  album_id: albumIdSchema,
  user: apiUserSchema,
  title: reviewTitleSchema,
  content: reviewContentSchema,
  likes_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type ApiReview = z.infer<typeof apiReviewSchema>

export function isApiReview(obj: unknown): obj is ApiReview {
  return apiReviewSchema.safeParse(obj).success
}
