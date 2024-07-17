import { env } from '@/env.mjs'
import { addPaginationParams } from '@/lib/add-pagination-params'
import { serverFetcher } from '@/lib/server-fetcher'
import { toUser } from '@/lib/transform/user'
import { apiUsersWithPaginationSchema } from '@/types/api/user'
import { EntityNotFoundError, InvalidDataReceivedError } from '@/types/error'
import type { PaginationParams } from '@/types/pagination'
import { type UsersWithPagination } from '@/types/user'
import { ZodError } from 'zod'

export const listFollowees = async (
  username: string,
  params: PaginationParams,
): Promise<UsersWithPagination> => {
  try {
    const url = addPaginationParams(
      `${env.API_URL}/users/${username}/followees`,
      params,
    )

    const data = await serverFetcher(url, { cache: 'no-store' })

    const usersWP = apiUsersWithPaginationSchema.parse(data)

    return {
      users: usersWP.users.map((u) => toUser(u)),
      offset: usersWP.offset,
      limit: usersWP.limit,
      total: usersWP.total,
    }
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      throw new EntityNotFoundError(
        `ユーザー${username}が存在しません: ${e.message}`,
      )
    }

    if (e instanceof ZodError) {
      throw new InvalidDataReceivedError(
        `APIからのデータが不正です: ${e.message}`,
      )
    }

    throw e
  }
}
