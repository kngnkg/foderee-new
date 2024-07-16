import type { ApiUser } from '@/types/api/user'
import type { User } from '@/types/user'
import { isUser } from '@/types/user'

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
