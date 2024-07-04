import { userSchema } from '@/types/user'
import * as z from 'zod'

export enum PublishedStatus {
  Published = 'published',
  Unpublished = 'unpublished',
  Draft = 'draft',
}

export const reviewTitleSchema = z
  .string()
  .min(1, {
    message: 'レビュータイトルは必須です',
  })
  .max(100, {
    message: 'レビュータイトルは100文字以下で入力してください',
  })

// TODO: editorjsのデータ構造をzodで定義する
export const reviewContentSchema = z.any()

export const authorSchema = userSchema.pick({
  username: true,
  immutableId: true,
  displayName: true,
  avatarUrl: true,
})

export const reviewSchema = z.object({
  reviewId: z.string().uuid(),
  publishedStatus: z.enum([
    PublishedStatus.Published,
    PublishedStatus.Unpublished,
    PublishedStatus.Draft,
  ]),
  album: z.string().uuid(),
  author: authorSchema,
  title: reviewTitleSchema,
  content: reviewContentSchema,
  likesCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Author = z.infer<typeof authorSchema>
export type Review = z.infer<typeof reviewSchema>
