import type { Cursor, UserListResponse } from '@/app/api/utils'
import { env } from '@/env.mjs'
import { isApiUsers, toUsers } from '@/types/api/user'

export const listFollowees = async (
  username: string,
  cursor: Cursor,
): Promise<UserListResponse | null> => {
  try {
    let url = `${env.API_URL}/users/${username}/followees`
    if (cursor.cursor || cursor.limit) {
      url += `?cursor=${cursor.cursor}&limit=${cursor.limit}`
    }
    const resp = await fetch(url, {
      cache: 'no-store',
    })

    if (!resp) {
      return null
    }
    if (resp.status !== 200) {
      return null
    }

    const data = await resp.json()

    if (!isApiUsers(data)) {
      console.error('Invalid users data:', data)
      return null
    }

    return {
      users: toUsers(data),
      nextCursor: data.nextCursor,
      total: data.total,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
