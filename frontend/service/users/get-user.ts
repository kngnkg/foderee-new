import { env } from '@/env.mjs'
import { isApiUser, toUser } from '@/types/api/user'
import type { User } from '@/types/user'

export const getUser = async (username: string): Promise<User | null> => {
  try {
    const resp = await fetch(
      `${env.API_URL}/users/${username}`,
      // `${env.API_URL}/users/${encodeURIComponent(username)}`,
      {
        cache: 'no-store',
      },
    )

    if (!resp) {
      return null
    }
    if (resp.status !== 200) {
      return null
    }

    const data = await resp.json()
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
