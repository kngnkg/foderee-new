import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { toUser } from '@/lib/transform/user'
import { ApiErrorType, isApiError } from '@/types/api/error'
import { isApiUser } from '@/types/api/user'
import { EntityNotFoundError } from '@/types/error'
import type { User } from '@/types/user'

export const getUser = async (username: string): Promise<User> => {
  try {
    const data = await serverFetcher(`${env.API_URL}/users/${username}`, {
      cache: 'no-store',
    })

    if (!isApiUser(data)) {
      if (!isApiError(data)) {
        throw new Error('エラーレスポンスの形式が不正です')
      }

      if (data.type === ApiErrorType.EntityNotFound) {
        throw new EntityNotFoundError(`ユーザー${username}が存在しません`)
      }

      throw new Error(
        `APIリクエスト中にエラーが発生しました: ${data.type} ,${data.message}`,
      )
    }

    return toUser(data)
  } catch (e) {
    throw e
  }
}
