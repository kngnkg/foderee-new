import { isApiUser, type ApiUser } from '@/types/api/user'

export const generateApiUserForTest = (
  data: Partial<ApiUser> = {},
): ApiUser => {
  const apiUser = {
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

  if (!isApiUser(apiUser)) {
    throw new Error(`Invalid API user data: ${apiUser}`)
  }
  return apiUser
}
