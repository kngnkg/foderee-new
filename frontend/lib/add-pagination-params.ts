import type { PaginationParams } from '@/types/pagination'

export function addPaginationParams(
  url: string,
  params: PaginationParams,
): string {
  if (
    (params.offset === undefined || params.offset === null) &&
    (params.limit === undefined || params.limit === null)
  ) {
    return url
  }

  url += '?'
  if (params.offset !== undefined && params.offset !== null) {
    url += `offset=${params.offset}&`
  }
  if (params.limit !== undefined && params.limit !== null) {
    url += `limit=${params.limit}`
  }
  return url.replace(/&$/, '')
}
