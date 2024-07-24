import { albumFetcher, useAlbums } from '@/hooks/albums/use-albums'
import { clientFetcher } from '@/lib/client-fetcher'
import { generateAlbumSimplifiedForTest } from '@/lib/testutil/albums'
import {
  transformAlbumSimplified,
  transformBffAlbumSimplified,
} from '@/lib/transform/bff-album'
import type { PagedBffAlbums } from '@/types/bff/album'
import { AppError, AppErrorType } from '@/types/error'
import { act, renderHook } from '@testing-library/react'
import useSWRInfinite from 'swr/infinite'

jest.mock('@/lib/client-fetcher', () => ({
  clientFetcher: jest.fn(),
}))

jest.mock('swr/infinite', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/env.mjs', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'http://example.com/api',
  },
}))

describe('albumFetcher', () => {
  const mockClientFetcher = clientFetcher as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('アルバムが存在する場合はアルバムリストを返す', async () => {
    const mockData: PagedBffAlbums = {
      albums: [
        transformBffAlbumSimplified(generateAlbumSimplifiedForTest({})),
        transformBffAlbumSimplified(generateAlbumSimplifiedForTest({})),
      ],
      offset: 0,
      limit: 10,
      total: 2,
    }
    mockClientFetcher.mockResolvedValue(mockData)

    const resp = await albumFetcher('http://example.com/api/albums')

    expect(resp).toEqual({
      albums: mockData.albums.map((album) => transformAlbumSimplified(album)),
      offset: mockData.offset,
      limit: mockData.limit,
      total: mockData.total,
    })
  })

  it('アルバムが存在しない場合は空のアルバムリストを返す', async () => {
    const mockData: PagedBffAlbums = {
      albums: [],
      offset: 0,
      limit: 10,
      total: 0,
    }
    mockClientFetcher.mockResolvedValue(mockData)

    const resp = await albumFetcher('http://example.com/api/albums')

    expect(resp).toEqual({
      albums: [],
      offset: mockData.offset,
      limit: mockData.limit,
      total: mockData.total,
    })
  })

  it('受け取ったデータが不正な場合はエラーを投げる', async () => {
    mockClientFetcher.mockResolvedValue({ albums: [] })

    const errObj = await albumFetcher('http://example.com/api/users').catch(
      (e) => e,
    )

    expect(errObj).toBeInstanceOf(AppError)
    expect((errObj as AppError).type).toBe(
      AppErrorType.InvalidDataReceivedError,
    )
  })

  it('その他のエラーの場合はエラーをそのまま投げる', async () => {
    const otherError = new Error('error')
    mockClientFetcher.mockRejectedValue(otherError)

    const errObj = await albumFetcher('http://example.com/api/users').catch(
      (e) => e,
    )

    expect(errObj).toEqual(otherError)
  })
})

describe('useAlbums', () => {
  const mockUseSWRInfinite = useSWRInfinite as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('初期状態のstateを正しく返す', async () => {
    mockUseSWRInfinite.mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      size: 0,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() => useAlbums({ query: 'test' }))

    expect(result.current).toEqual({
      pagedAlbumsList: undefined,
      error: undefined,
      isLoading: true,
      isLoadingMore: true,
      isReachingEnd: false,
      isValidating: false,
      loadMore: expect.any(Function),
    })
  })

  it('loadMoreが呼ばれると次のページを取得する', async () => {
    const setSizeMock = jest.fn()

    mockUseSWRInfinite.mockReturnValue({
      data: [
        {
          albums: [generateAlbumSimplifiedForTest({})],
          offset: 2,
          limit: 10,
          total: 20,
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
      size: 1,
      setSize: setSizeMock,
    })

    const { result } = renderHook(() => useAlbums({ query: 'test' }))

    expect(result.current.isLoadingMore).toBe(false)
    expect(result.current.isReachingEnd).toBe(false)

    act(() => {
      result.current.loadMore()
    })

    expect(setSizeMock).toHaveBeenCalledWith(2)
  })

  it('全てのページを取得した場合にisReachingEndがtrueになる', async () => {
    mockUseSWRInfinite.mockReturnValue({
      data: [
        {
          albums: [generateAlbumSimplifiedForTest({})],
          offset: 2,
          limit: 10,
          total: 2,
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
      size: 2,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() => useAlbums({ query: 'test' }))

    expect(result.current.isReachingEnd).toBe(true)
  })

  it('エラーを正しくハンドリングする', async () => {
    const mockError = new Error('mock error')

    mockUseSWRInfinite.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      size: 0,
      setSize: jest.fn(),
    })

    const { result } = renderHook(() => useAlbums({ query: 'test' }))

    expect(result.current.error).toBe(mockError)
    expect(result.current.isLoading).toBe(false)
  })
})
