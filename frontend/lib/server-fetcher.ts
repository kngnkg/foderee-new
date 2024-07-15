import { ApiErrorType, isApiError } from '@/types/api/error'

// サーバー側でfetchを行う関数
export const serverFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      const errorRes = await res.json()
      if (!isApiError(errorRes)) {
        throw new Error('エラーレスポンスの形式が不正です')
      }

      switch (res.status) {
        case 401:
          // TODO: 認証エラー時の処理
          throw new Error('認証エラーです。ログインし直してください。')
        case 403:
          // TODO: 権限エラー時の処理
          throw new Error('権限がありません。')
        case 404:
          if (errorRes.type === ApiErrorType.EndpointNotFound) {
            throw new Error('エンドポイントが見つかりませんでした')
          }
          throw new Error(
            errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
          )
        default:
          throw new Error(
            errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
          )
      }
    }

    const data = await res.json()
    return data
  } catch (e) {
    throw e
  }
}
