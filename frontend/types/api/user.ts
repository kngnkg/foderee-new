import * as z from 'zod'

import { apiPaginationSchema } from '@/types/api/pagination'
import { userNameSchema } from '@/types/user'

export const apiUserSchema = z.object({
  username: userNameSchema,
  immutable_id: z.string().uuid(),
  display_name: z.string(),
  avatar_url: z.string().optional(),
  bio: z.string().optional(),
  followers_count: z.number(),
  following_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type ApiUser = z.infer<typeof apiUserSchema>

export function isApiUser(obj: unknown): obj is ApiUser {
  return apiUserSchema.safeParse(obj).success
}

export const ApiUsersSchema = apiPaginationSchema.extend({
  users: z.array(apiUserSchema),
})

export type ApiUsers = z.infer<typeof ApiUsersSchema>

export function isApiUsers(obj: unknown): obj is ApiUsers {
  return ApiUsersSchema.safeParse(obj).success
}
