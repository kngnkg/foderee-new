import {
  addPaginationParams,
  addSearchParams,
} from '@/lib/add-pagination-params'
import type { Pagination } from '@/types/pagination'

export const getURLWithPaginationParams = (
  endpoint: string,
  limit: number,
  pageIndex: number,
  previousPage: Pagination,
): string | null => {
  // 最後に到達した場合
  if (previousPage && previousPage.offset >= previousPage.total) {
    return null
  }

  // 最初のページの場合
  if (pageIndex === 0) {
    return addPaginationParams(endpoint, { offset: 0, limit })
  }

  const nextOffset = previousPage.offset + previousPage.limit
  return addPaginationParams(endpoint, { offset: nextOffset, limit })
}

export const getURLWithSearchParams = (
  endpoint: string,
  query: string,
  limit: number,
  pageIndex: number,
  previousPage: Pagination,
): string | null => {
  // 検索クエリがない場合
  if (query === '') {
    return null
  }

  // 最後に到達した場合
  if (previousPage && previousPage.offset >= previousPage.total) {
    return null
  }

  // 最初のページの場合
  if (pageIndex === 0) {
    return addSearchParams(endpoint, { q: query, offset: 0, limit })
  }

  const nextOffset = previousPage.offset + previousPage.limit
  return addSearchParams(endpoint, { q: query, offset: nextOffset, limit })
}
