import type { Pagination } from '@/types/pagination'

export const hasFetchedAllPages = (data: Pagination[] | undefined): boolean => {
  if (!data || data.length === 0) {
    return false
  }

  if (data[0].total === 0) return true

  // 最後のページを取得
  const lastPage = data[data.length - 1]
  return lastPage.offset >= lastPage.total
}
