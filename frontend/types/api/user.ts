import type { User } from '@/types/user'

export type ApiUser = {
  username: string
  immutable_id: string
  display_name: string
  avatar_url?: string
  bio?: string
  followers_count: number
  following_count: number
  created_at: string
  updated_at: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiUser(obj: any): obj is ApiUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.username === 'string' &&
    typeof obj.immutable_id === 'string' &&
    typeof obj.display_name === 'string' &&
    (typeof obj.avatar_url === 'undefined' ||
      typeof obj.avatar_url === 'string') &&
    (typeof obj.bio === 'undefined' || typeof obj.bio === 'string') &&
    typeof obj.followers_count === 'number' &&
    typeof obj.following_count === 'number' &&
    typeof obj.created_at === 'string' &&
    typeof obj.updated_at === 'string'
  )
}

export function toUser(user: ApiUser): User {
  return {
    username: user.username,
    immutableId: user.immutable_id,
    displayName: user.display_name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    followersCount: user.followers_count,
    followingCount: user.following_count,
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at),
  }
}
