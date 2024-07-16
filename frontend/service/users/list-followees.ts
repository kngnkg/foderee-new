import { env } from '@/env.mjs'
import { addPaginationParams } from '@/lib/add-pagination-params'
import { serverFetcher } from '@/lib/server-fetcher'
import { toUser } from '@/lib/transform/user'
import { ApiErrorType, isApiError } from '@/types/api/error'
import { isApiUsers } from '@/types/api/user'
import { EntityNotFoundError } from '@/types/error'
import type { PaginationParams } from '@/types/pagination'
import type { UsersWithPagination } from '@/types/user'

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

    if (!isApiUsers(data)) {
      if (!isApiError(data)) {
        throw new Error('エラーレスポンスの形式が不正です')
      }

      // ユーザーが存在しない場合はエラーを返す
      if (data.type === ApiErrorType.EntityNotFound) {
        throw new EntityNotFoundError(`ユーザー${username}が存在しません`)
      }

      throw new Error(
        `APIリクエスト中にエラーが発生しました: ${data.type} ,${data.message}`,
      )
    }

    return {
      users: data.users.map((u) => toUser(u)),
      offset: data.offset,
      limit: data.limit,
      total: data.total,
    }
  } catch (e) {
    throw e
  }
}
