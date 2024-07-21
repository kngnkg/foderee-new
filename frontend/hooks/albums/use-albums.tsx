import type { PagedAlbums } from '@/types/album'
import useSWRInfinite from 'swr/infinite'

import { env } from '@/env.mjs'
import { clientFetcher } from '@/lib/client-fetcher'
import { transformAlbumSimplified } from '@/lib/transform/bff-album'

interface UseAlbumsProps {
  query: string
  limit?: number
}

interface UseAlbums {
  data: PagedAlbums[] | undefined
  error: Error | undefined
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<PagedAlbums> => {
  const data = await clientFetcher(resource, init)
  // TODO: エラーハンドリング

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    albums: data.albums.map((album: any) => transformAlbumSimplified(album)),
    offset: data.offset,
    limit: data.limit,
    total: data.total,
  }
}

export const useAlbums = ({ query, limit = 20 }: UseAlbumsProps): UseAlbums => {
  const endpoint = `${env.NEXT_PUBLIC_API_URL}/album-search?q=${query}`

  const getKey = (pageIndex: number, previousPageData: PagedAlbums) => {
    // 検索クエリがない場合
    if (query === '') {
      return null
    }

    // 最後に到達した場合
    if (previousPageData && previousPageData.offset >= previousPageData.total) {
      return null
    }

    // 最初のページの場合
    if (pageIndex === 0) {
      return `${endpoint}&offset=0&limit=${limit}`
    }

    const nextOffset = previousPageData.offset + previousPageData.limit
    return `${endpoint}&offset=${nextOffset}&limit=${limit}`
  }

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<PagedAlbums>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return { data, error, isLoading, isValidating, loadMore }
}
