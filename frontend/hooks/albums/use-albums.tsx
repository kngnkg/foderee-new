import { type PagedAlbums } from '@/types/album'
import useSWRInfinite from 'swr/infinite'

import { env } from '@/env.mjs'
import { clientFetcher } from '@/lib/client-fetcher'
import { getURLWithSearchParams } from '@/lib/get-url-with-params'
import { hasFetchedAllPages } from '@/lib/has-fetched-all-pages'
import { transformAlbumSimplified } from '@/lib/transform/bff-album'
import { pagedBffAlbums } from '@/types/bff/album'
import { AppError, AppErrorType } from '@/types/error'
import type { Pagination } from '@/types/pagination'
import { ZodError } from 'zod'

interface UseAlbumsProps {
  query: string
  limit?: number
}

interface UseAlbums {
  pagedAlbumsList: PagedAlbums[] | undefined
  error: Error | undefined
  isLoading: boolean
  isLoadingMore: boolean | undefined
  isReachingEnd: boolean
  isValidating: boolean
  loadMore: () => void
}

export const albumFetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<PagedAlbums> => {
  try {
    const data = await clientFetcher(resource, init)

    const parsed = pagedBffAlbums.parse(data)

    return {
      albums: parsed.albums.map((album) => transformAlbumSimplified(album)),
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

export const useAlbums = ({ query, limit = 20 }: UseAlbumsProps): UseAlbums => {
  const endpoint = `${env.NEXT_PUBLIC_API_URL}/album-search`

  const getKey = (pageIndex: number, previousPage: Pagination) =>
    getURLWithSearchParams(endpoint, query, limit, pageIndex, previousPage)

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<PagedAlbums>(getKey, albumFetcher)

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isReachingEnd = hasFetchedAllPages(data)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return {
    pagedAlbumsList: data,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isValidating,
    loadMore,
  }
}
