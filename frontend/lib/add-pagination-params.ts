import type { PaginationParams } from '@/types/pagination'

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
