import type { User } from '@/types/user'

export type ApiUser = {
  username: string
  immutableId: string
  displayName: string
  avatarUrl?: string
  bio?: string
  followersCount: number
  followingCount: number
  createdAt: string
  updatedAt: string
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
    immutableId: user.immutableId,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }
}
