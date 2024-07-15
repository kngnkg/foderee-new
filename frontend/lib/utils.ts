import type { PaginationParams, SearchParams } from '@/types/pagination'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
