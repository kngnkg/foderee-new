import { clientFetcher } from '@/lib/client-fetcher'
import { getURLWithPaginationParams } from '@/lib/get-url-with-params'
import { hasFetchedAllPages } from '@/lib/has-fetched-all-pages'
import { transformUser } from '@/lib/transform/bff-user'
import { wait } from '@/lib/utils'
import { pagedBffUsers } from '@/types/bff/users'
import { AppError, AppErrorType } from '@/types/error'
import type { Pagination } from '@/types/pagination'
import type { PagedUsers } from '@/types/user'
import useSWRInfinite from 'swr/infinite'
import { ZodError } from 'zod'

interface UseUsersProps {
  endpoint: string
  limit?: number
}

interface UseUsers {
  pagedUsersList: PagedUsers[] | undefined
  error: Error | undefined
  isLoading: boolean
  isLoadingMore: boolean | undefined
  isReachingEnd: boolean
  isValidating: boolean
  loadMore: () => void
}

export const userFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<PagedUsers> => {
  try {
    const data = await clientFetcher(resource, init)

    // TODO: 削除する
    await wait(1)

    const parsed = pagedBffUsers.parse(data)

    return {
      users: parsed.users.map((user) => transformUser(user)),
      offset: parsed.offset,
      limit: parsed.limit,
      total: parsed.total,
    }
  } catch (e) {
    if (e instanceof ZodError) {
      throw new AppError(
        'APIからのレスポンスの形式が不正です',
        AppErrorType.InvalidDataReceivedError,
      )
    }

    throw e
  }
}

export const useUsers = ({ endpoint, limit = 10 }: UseUsersProps): UseUsers => {
  const getKey = (pageIndex: number, previousPage: Pagination) =>
    getURLWithPaginationParams(endpoint, limit, pageIndex, previousPage)

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<PagedUsers>(getKey, userFetcher)

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isReachingEnd = hasFetchedAllPages(data)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return {
    pagedUsersList: data,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isValidating,
    loadMore,
  }
}
