import { albumSchema } from '@/types/album'
import { userSchema } from '@/types/user'
import * as z from 'zod'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isContentHeader(obj: any): obj is ContentHeader {
  return headerSchema.safeParse(obj).success
}

export const paragraphSchema = z.object({
  text: z.string(),
})

export type ContentParagraph = z.infer<typeof paragraphSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isContentParagraph(obj: any): obj is ContentParagraph {
  return paragraphSchema.safeParse(obj).success
}

export const listSchema = z.object({
  style: z.string(),
  items: z.array(z.string()),
})

export type ContentList = z.infer<typeof listSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isContentList(obj: any): obj is ContentList {
  return listSchema.safeParse(obj).success
}

export const quoteSchema = z.object({
  text: z.string(),
  caption: z.string(),
  alignment: z.string(),
})

export type ContentQuote = z.infer<typeof quoteSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isContentQuote(obj: any): obj is ContentQuote {
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
  reviewId: z.z.string().uuid(),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isReview(obj: any): obj is Review {
  return reviewSchema.safeParse(obj).success
}
