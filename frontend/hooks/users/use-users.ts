import { transformUser } from '@/hooks/transform'
import { clientFetcher } from '@/lib/utils'
import type { UsersWithPagination } from '@/types/user'
import useSWRInfinite from 'swr/infinite'

interface UseUsersProps {
  endpoint: string
  limit?: number
}

interface UseUsers {
  data: UsersWithPagination[] | undefined
  error: Error | undefined
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<UsersWithPagination> => {
  const data = await clientFetcher(resource, init)
  // TODO: エラーハンドリング

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    users: data.users.map((user: any) => transformUser(user)),
    offset: data.offset,
    limit: data.limit,
    total: data.total,
  }
}

export const useUsers = ({ endpoint, limit = 10 }: UseUsersProps): UseUsers => {
  const getKey = (pageIndex: number, previousPageData: UsersWithPagination) => {
    // 最後に到達した場合
    if (previousPageData && previousPageData.offset >= previousPageData.total) {
      return null
    }

    // 最初のページの場合
    if (pageIndex === 0) {
      return `${endpoint}?offset=0&limit=${limit}`
    }

    const nextOffset = previousPageData.offset + previousPageData.limit
    return `${endpoint}?offset=${nextOffset}&limit=${limit}`
  }

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<UsersWithPagination>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return { data, error, isLoading, isValidating, loadMore }
}
