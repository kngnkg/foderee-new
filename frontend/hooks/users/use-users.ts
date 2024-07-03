import type { User } from '@/types/user'
import useSWRInfinite from 'swr/infinite'

interface UseUsersProps {
  endpoint: string
  limit?: number
}

type UserWithPagination = {
  users: User[]
  nextCursor: string | null
}

interface UseUsers {
  data: UserWithPagination[] | undefined
  error: Error | undefined
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<UserWithPagination> => {
  const res = await fetch(resource, init)
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  const body = await res.json()
  return body
}

export const useUsers = ({ endpoint, limit = 10 }: UseUsersProps): UseUsers => {
  const getKey = (pageIndex: number, previousPageData: UserWithPagination) => {
    // 最後に到達した場合
    if (previousPageData && previousPageData.nextCursor === '') {
      return null
    }

    // 最初のページでは、`previousPageData` がない
    if (pageIndex === 0) {
      return `${endpoint}`
    }

    // API のエンドポイントにカーソルを追加する
    return `${endpoint}?cursor=${previousPageData.nextCursor}&limit=${limit}`
  }

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<UserWithPagination>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return { data, error, isLoading, isValidating, loadMore }
}
