import { paginationSchema } from '@/types/pagination'
import * as z from 'zod'

export const userNameSchema = z
  .string()
  .min(4, {
    message: 'ユーザー名は4文字以上で入力してください',
  })
  .max(20, {
    message: 'ユーザー名は20文字以下で入力してください',
  })
  .regex(/^@/)

export const immutableIdSchema = z.string().uuid()

export const displayNameSchema = z
  .string()
  .min(3, {
    message: '表示名は3文字以上で入力してください',
  })
  .max(200, {
    message: '表示名は200文字以下で入力してください',
  })

export const avatarUrlSchema = z.string().url().or(z.literal(''))

export const bioSchema = z
  .string()
  .max(1000, {
    message: '自己紹介は1000文字以下で入力してください',
  })
  .or(z.literal(''))

export const profileSchema = z.object({
  displayName: displayNameSchema,
  avatarUrl: avatarUrlSchema,
  bio: bioSchema,
})

export const userSchema = z.object({
  username: userNameSchema,
  immutableId: immutableIdSchema,
  displayName: displayNameSchema,
  avatarUrl: avatarUrlSchema,
  bio: bioSchema,
  followersCount: z.number(),
  followingCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof userSchema>

export function isUser(obj: unknown): obj is User {
  return userSchema.safeParse(obj).success
}

export const usersWithPaginationSchema = paginationSchema.extend({
  users: z.array(userSchema),
})

export type UsersWithPagination = z.infer<typeof usersWithPaginationSchema>

export function isUsersWithPagination(
  obj: unknown,
): obj is UsersWithPagination {
  return usersWithPaginationSchema.safeParse(obj).success
}
