import { env } from '@/env.mjs'
import { addPaginationParams, serverFetcher } from '@/lib/utils'
import { isApiUsers, toUser } from '@/types/api/user'
import type { PaginationParams } from '@/types/pagination'
import type { UsersWithPagination } from '@/types/user'

export const listFollowees = async (
  username: string,
  params: PaginationParams,
): Promise<UsersWithPagination | null> => {
  try {
    const url = addPaginationParams(
      `${env.API_URL}/users/${username}/followees`,
      params,
    )

    const data = await serverFetcher(url, { cache: 'no-store' })
    if (!isApiUsers(data)) {
      console.error('Invalid users data:', data)
      return null
    }

    return {
      users: data.users.map((u) => toUser(u)),
      offset: data.offset,
      limit: data.limit,
      total: data.total,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
