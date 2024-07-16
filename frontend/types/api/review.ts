import { apiUserSchema } from '@/types/api/user'
import { z } from 'zod'

const apiHeaderSchema = z.object({
  text: z.string(),
  level: z.number(),
})

const apiParagraphSchema = z.object({
  text: z.string(),
})

const apiListSchema = z.object({
  style: z.string(),
  items: z.array(z.string()),
})

const apiQuoteSchema = z.object({
  text: z.string(),
  caption: z.string(),
  alignment: z.string(),
})

export const apiReviewSchema = z.object({
  review_id: z.string().uuid(),
  published_status: z.enum(['published', 'unpublished', 'draft']),
  album_id: z.string(),
  user: apiUserSchema,
  title: z.string(),
  content: z.object({
    time: z.number(),
    blocks: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        data: z.union([
          apiHeaderSchema,
          apiParagraphSchema,
          apiListSchema,
          apiQuoteSchema,
        ]),
      }),
    ),
  }),
  likes_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type ApiReview = z.infer<typeof apiReviewSchema>

export function isApiReview(obj: unknown): obj is ApiReview {
  return apiReviewSchema.safeParse(obj).success
}
