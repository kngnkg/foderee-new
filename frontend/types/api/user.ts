import * as z from 'zod'

import { paginationSchema } from '@/types/pagination'
import {
  avatarUrlSchema,
  bioSchema,
  displayNameSchema,
  followersCountSchema,
  followingCountSchema,
  immutableIdSchema,
  usernameSchema,
} from '@/types/user'

export const apiUserSchema = z.object({
  username: usernameSchema,
  immutable_id: immutableIdSchema,
  display_name: displayNameSchema,
  avatar_url: avatarUrlSchema,
  bio: bioSchema,
  followers_count: followersCountSchema,
  following_count: followingCountSchema,
  created_at: z.string(),
  updated_at: z.string(),
})

export type ApiUser = z.infer<typeof apiUserSchema>

export function isApiUser(obj: unknown): obj is ApiUser {
  return apiUserSchema.safeParse(obj).success
}

export const apiPagedUsersSchema = paginationSchema.extend({
  users: z.array(apiUserSchema),
})

export type ApiPagedUsers = z.infer<typeof apiPagedUsersSchema>
