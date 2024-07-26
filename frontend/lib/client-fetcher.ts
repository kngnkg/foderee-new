import {
  bffErrorResponseSchema,
  BffErrorResponseType,
} from '@/types/bff/error-response'
import { AppError, AppErrorType } from '@/types/error'
import { ZodError } from 'zod'

// ブラウザでfetchを行う関数
export const clientFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<unknown> => {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      // TODO: ネットワークエラー時の処理

      const data = await res.json()
      const errRes = bffErrorResponseSchema.parse(data)

      switch (res.status) {
        case 401:
          // TODO: 認証エラー時の処理
          throw new Error('認証エラーです。ログインし直してください。')
        case 403:
          // TODO: 権限エラー時の処理
          throw new Error('権限がありません。')
        case 404:
          if (errRes.type === BffErrorResponseType.EndpointNotFound) {
            throw new Error('エンドポイントが見つかりませんでした')
          }
          if (errRes.type === BffErrorResponseType.EntityNotFound) {
            throw new AppError(errRes.message, AppErrorType.EntityNotFoundError)
          }
          break
      }

      throw new AppError(`APIエラー: ${errRes.message}`, AppErrorType.ApiError)
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
