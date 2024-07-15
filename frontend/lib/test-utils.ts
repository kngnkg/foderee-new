import type { ApiUser } from '@/types/api/user'
import type { User } from '@/types/user'

export const toExpectedUser = (data: ApiUser): User => ({
  username: data.username,
  immutableId: data.immutable_id,
  displayName: data.display_name,
  avatarUrl: data.avatar_url || '',
  bio: data.bio || '',
  followersCount: data.followers_count,
  followingCount: data.following_count,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
})
