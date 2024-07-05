import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
      const error = new Error(
        errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
      )

      throw error
    }

    // TODO: エラーハンドリング

    return res.json()
  } catch (e) {
    throw e
  }
}

export const clientFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      const errorRes = await res.json()
      const error = new Error(
        errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
      )

      throw error
    }

    // TODO: エラーハンドリング

    return res.json()
  } catch (e) {
    throw e
  }
}
