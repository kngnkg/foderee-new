import { apiErrorResponseSchema, ApiErrorType } from '@/types/api/error'
import { ApiError, EntityNotFoundError } from '@/types/error'
import { ZodError } from 'zod'

// サーバー側でfetchを行う関数
export const serverFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<unknown> => {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      // TODO: ネットワークエラー時の処理

      const data = await res.json()
      const errRes = apiErrorResponseSchema.parse(data)

      switch (res.status) {
        case 401:
          // TODO: 認証エラー時の処理
          throw new Error('認証エラーです。ログインし直してください。')
        case 403:
          // TODO: 権限エラー時の処理
          throw new Error('権限がありません。')
        case 404:
          if (errRes.type === ApiErrorType.EndpointNotFound) {
            throw new Error('エンドポイントが見つかりませんでした')
          }
          if (errRes.type === ApiErrorType.EntityNotFound) {
            throw new EntityNotFoundError(errRes.message)
          }
          break
      }

      throw new ApiError(errRes.message, errRes.type)
    }

    const data = await res.json()
    return data
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(`APIからのデータが不正です: ${e.message}`)
    }

    throw e
  }
}
