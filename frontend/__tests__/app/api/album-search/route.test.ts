/**
 * @jest-environment node
 */

import { GET } from '@/app/api/album-search/route'
import { handleError } from '@/app/api/response'
import { generateAlbumSimplifiedForTest } from '@/lib/testutil/albums'
import { transformBffAlbumSimplified } from '@/lib/transform/bff-album'
import { searchAlbums } from '@/service/albums/search-albums'
import { NextRequest } from 'next/server'

jest.mock('@/service/albums/search-albums', () => ({
  searchAlbums: jest.fn(),
}))

jest.mock('@/app/api/response', () => {
  return {
    handleError: jest.fn(),
  }
})

describe('/api/album-search', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    const mockSearchAlbums = searchAlbums as jest.Mock
    const mockHandleError = handleError as jest.Mock

    it('アルバムが存在する場合はステータスコード200とアルバムリストを返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo&offset=0&limit=20',
      )

      const mockAlbumData = {
        albums: [
          generateAlbumSimplifiedForTest({ albumId: '1' }),
          generateAlbumSimplifiedForTest({ albumId: '2' }),
        ],
        offset: 0,
        limit: 20,
        total: 2,
      }
      mockSearchAlbums.mockResolvedValueOnce(mockAlbumData)
      const expected = {
        albums: mockAlbumData.albums.map(transformBffAlbumSimplified),
        offset: 0,
        limit: 20,
        total: 2,
      }

      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('アルバムが存在しない場合はステータスコード200と空のアルバムリストを返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo',
      )

      const mockAlbumData = {
        albums: [],
        offset: 0,
        limit: 20,
        total: 0,
      }
      mockSearchAlbums.mockResolvedValueOnce(mockAlbumData)
      const expected = {
        albums: [],
        offset: 0,
        limit: 20,
        total: 0,
      }

      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('エラーが発生した場合はhandleErrorが呼ばれる', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo',
      )
      const errObj = new Error('error')
      mockSearchAlbums.mockRejectedValueOnce(errObj)

      await GET(request)

      expect(mockHandleError).toHaveBeenCalledWith(errObj)
    })
  })
})
