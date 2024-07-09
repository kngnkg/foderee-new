import * as z from 'zod'

import { apiPaginationSchema } from '@/types/api/pagination'
import { isUser, userNameSchema, type User } from '@/types/user'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiUser(obj: any): obj is ApiUser {
  return apiUserSchema.safeParse(obj).success
}

export const ApiUsersSchema = apiPaginationSchema.extend({
  users: z.array(apiUserSchema),
})

export type ApiUsers = z.infer<typeof ApiUsersSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiUsers(obj: any): obj is ApiUsers {
  return ApiUsersSchema.safeParse(obj).success
}

export function toUser(apiUser: ApiUser): User {
  const user = {
    username: apiUser.username,
    immutableId: apiUser.immutable_id,
    displayName: apiUser.display_name,
    avatarUrl: apiUser.avatar_url,
    bio: apiUser.bio,
    followersCount: apiUser.followers_count,
    followingCount: apiUser.following_count,
    createdAt: new Date(apiUser.created_at),
    updatedAt: new Date(apiUser.updated_at),
  }

  if (!isUser(user)) {
    throw new Error('Invalid user data')
  }
  return user
}
