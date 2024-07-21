import { type ApiUser } from '@/types/api/user'
import type { User } from '@/types/user'

export const generateUserForTest = (data: Partial<User> = {}): User => {
  return {
    username: 'testuser',
    immutableId: 'e5822d84-9119-4caa-ad96-a4c6ebdaa8a7',
    displayName: 'Test User',
    avatarUrl: 'http://example.com/avatar.jpg',
    bio: 'Hello, World!',
    followersCount: 10,
    followingCount: 20,
    createdAt: new Date('2021-01-01T00:00:00Z'),
    updatedAt: new Date('2021-01-01T00:00:00Z'),
    ...data,
  }
}

export const generateApiUserForTest = (
  data: Partial<ApiUser> = {},
): ApiUser => {
  return {
    username: '@testuser',
    immutable_id: 'e5822d84-9119-4caa-ad96-a4c6ebdaa8a7',
    display_name: 'Test User',
    avatar_url: 'http://example.com/avatar.jpg',
    bio: 'Hello, World!',
    followers_count: 10,
    following_count: 20,
    created_at: '2021-01-01T00:00:00Z',
    updated_at: '2021-01-01T00:00:00Z',
    ...data,
  }
}
