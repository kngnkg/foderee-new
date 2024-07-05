import { addUrlParams, type Cursor } from '@/app/api/utils'
import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/utils'
import { isApiUsers, toUser } from '@/types/api/user'
import type { UsersWithPagination } from '@/types/user'

export const listFollowees = async (
  username: string,
  cursor: Cursor,
): Promise<UsersWithPagination | null> => {
  try {
    const url = addUrlParams(
      `${env.API_URL}/users/${username}/followees`,
      cursor,
    )

    const data = await serverFetcher(url, { cache: 'no-store' })
    if (!isApiUsers(data)) {
      console.error('Invalid users data:', data)
      return null
    }

    return {
      users: data.users.map((u) => toUser(u)),
      nextCursor: data.next_cursor,
      total: data.total,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
