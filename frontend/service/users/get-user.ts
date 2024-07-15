import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { ApiErrorType, isApiError } from '@/types/api/error'
import { isApiUser, toUser } from '@/types/api/user'
import type { User } from '@/types/user'

export const getUser = async (username: string): Promise<User | null> => {
  try {
    const data = await serverFetcher(`${env.API_URL}/users/${username}`, {
      cache: 'no-store',
    })

    if (!isApiUser(data)) {
      if (!isApiError(data)) {
        throw new Error('エラーレスポンスの形式が不正です')
      }

      // ユーザーが存在しない場合はnullを返す
      if (data.type === ApiErrorType.EntityNotFound) {
        return null
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
