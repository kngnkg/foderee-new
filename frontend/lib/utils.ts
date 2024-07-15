import type { PaginationParams, SearchParams } from '@/types/pagination'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function addPaginationParams(
  url: string,
  params: PaginationParams,
): string {
  if (params.offset || params.limit) {
    url += '?'
    if (params.offset) {
      url += `offset=${params.offset}&`
    }
    if (params.limit) {
      url += `limit=${params.limit}`
    }
    url = url.replace(/&$/, '')
  }
  return url
}

export function addSearchParams(url: string, params: SearchParams): string {
  const urlWithPagination = addPaginationParams(url, {
    offset: params.offset,
    limit: params.limit,
  })
  return `${urlWithPagination}&q=${params.q}`
}
