import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/utils'
import { isApiUser, toUser } from '@/types/api/user'
import type { User } from '@/types/user'

export const getUser = async (username: string): Promise<User | null> => {
  try {
    const data = await serverFetcher(
      `${env.API_URL}/users/${username}`,
      // `${env.API_URL}/users/${encodeURIComponent(username)}`,
      {
        cache: 'no-store',
      },
    )
    if (!isApiUser(data)) {
      console.error('Invalid user data:', data)
      return null
    }

    return toUser(data)
  } catch (e) {
    console.error(e)
    return null
  }
}
