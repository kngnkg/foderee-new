import { env } from '@/env.mjs'
import { addPaginationParams } from '@/lib/add-pagination-params'
import { serverFetcher } from '@/lib/server-fetcher'
import { toUser } from '@/lib/transform/user'
import { apiPagedUsersSchema } from '@/types/api/user'
import { AppError, AppErrorType } from '@/types/error'
import type { PaginationParams } from '@/types/pagination'
import type { PagedUsers } from '@/types/user'
import { ZodError } from 'zod'

export const listFollowees = async (
  username: string,
  params: PaginationParams,
): Promise<PagedUsers> => {
  try {
    const url = addPaginationParams(
      `${env.API_URL}/users/${username}/followees`,
      params,
    )

    const data = await serverFetcher(url, { cache: 'no-store' })

    const pagedUsers = apiPagedUsersSchema.parse(data)

    return {
      users: pagedUsers.users.map((u) => toUser(u)),
      offset: pagedUsers.offset,
      limit: pagedUsers.limit,
      total: pagedUsers.total,
    }
  } catch (e) {
    if (e instanceof ZodError) {
      throw new AppError(
        `APIからのデータが不正です: ${e.message}`,
        AppErrorType.InvalidDataReceivedError,
      )
    }

    throw e
  }
}
