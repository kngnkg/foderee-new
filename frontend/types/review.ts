import { albumSchema } from '@/types/album'
import { userSchema } from '@/types/user'
import * as z from 'zod'

export const reviewIdSchema = z.string().uuid()

export enum PublishedStatus {
  Published = 'published',
  Unpublished = 'unpublished',
  Draft = 'draft',
}

export const publishedStatusSchema = z.nativeEnum(PublishedStatus)

export const reviewTitleSchema = z
  .string()
  .min(1, {
    message: 'レビュータイトルは必須です',
  })
  .max(100, {
    message: 'レビュータイトルは100文字以下で入力してください',
  })

export const headerSchema = z.object({
  text: z.string(),
  level: z.number(),
})

export type ContentHeader = z.infer<typeof headerSchema>

export function isContentHeader(obj: unknown): obj is ContentHeader {
  return headerSchema.safeParse(obj).success
}

export const paragraphSchema = z.object({
  text: z.string(),
})

export type ContentParagraph = z.infer<typeof paragraphSchema>

export function isContentParagraph(obj: unknown): obj is ContentParagraph {
  return paragraphSchema.safeParse(obj).success
}

export const listSchema = z.object({
  style: z.string(),
  items: z.array(z.string()),
})

export type ContentList = z.infer<typeof listSchema>

export function isContentList(obj: unknown): obj is ContentList {
  return listSchema.safeParse(obj).success
}

export const quoteSchema = z.object({
  text: z.string(),
  caption: z.string(),
  alignment: z.string(),
})

export type ContentQuote = z.infer<typeof quoteSchema>

export function isContentQuote(obj: unknown): obj is ContentQuote {
  return quoteSchema.safeParse(obj).success
}

export const contentBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.union([headerSchema, paragraphSchema, listSchema, quoteSchema]),
})

export type ContentBlock = z.infer<typeof contentBlockSchema>

export const reviewContentSchema = z.object({
  time: z.number(),
  blocks: z.array(contentBlockSchema),
})

export type Content = z.infer<typeof reviewContentSchema>

export const reviewSchema = z.object({
  reviewId: reviewIdSchema,
  publishedStatus: publishedStatusSchema,
  album: albumSchema,
  user: userSchema,
  title: reviewTitleSchema,
  content: reviewContentSchema,
  likesCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Review = z.infer<typeof reviewSchema>

export function isReview(obj: unknown): obj is Review {
  return reviewSchema.safeParse(obj).success
}

export function validateReview(obj: unknown): obj is Review {
  const result = reviewSchema.safeParse(obj)
  if (!result.success) {
    throw result.error
  }
  return true
}
