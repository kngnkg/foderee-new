import { paginationSchema } from '@/types/pagination'
import * as z from 'zod'

export const userSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'ユーザー名は4文字以上で入力してください',
    })
    .max(20, {
      message: 'ユーザー名は20文字以下で入力してください',
    })
    .regex(/^@/),
  immutableId: z.string().uuid(),
  displayName: z
    .string()
    .min(3, {
      message: '表示名は3文字以上で入力してください',
    })
    .max(200, {
      message: '表示名は200文字以下で入力してください',
    }),
  avatarUrl: z.string().url().or(z.literal('')),
  bio: z
    .string()
    .max(1000, {
      message: '自己紹介は1000文字以下で入力してください',
    })
    .or(z.literal('')),
  followersCount: z.number().int().min(0),
  followingCount: z.number().int().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const usernameSchema = userSchema.shape.username
export const immutableIdSchema = userSchema.shape.immutableId
export const displayNameSchema = userSchema.shape.displayName
export const avatarUrlSchema = userSchema.shape.avatarUrl
export const bioSchema = userSchema.shape.bio
export const followersCountSchema = userSchema.shape.followersCount
export const followingCountSchema = userSchema.shape.followingCount

export type User = z.infer<typeof userSchema>

export function isUser(obj: unknown): obj is User {
  return userSchema.safeParse(obj).success
}

export const pagedUsers = paginationSchema.extend({
  users: z.array(userSchema),
})

export type PagedUsers = z.infer<typeof pagedUsers>
