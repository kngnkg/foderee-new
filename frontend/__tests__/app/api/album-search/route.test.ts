/**
 * @jest-environment node
 */

import { GET } from '@/app/api/album-search/route'
import { generateAlbumSimplifiedForTest } from '@/lib/testutil/albums'
import { transformBffAlbumSimplified } from '@/lib/transform/bff-album'
import { searchAlbums } from '@/service/albums/search-albums'
import { BffErrorType } from '@/types/bff-error'
import { NextRequest } from 'next/server'

jest.mock('@/service/albums/search-albums', () => ({
  searchAlbums: jest.fn(),
}))

describe('/api/album-search', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    const mockSearchAlbums = searchAlbums as jest.Mock

    it('アルバムが存在する場合はステータスコード200とアルバムリストを返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo',
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

    it('クエリパラメータqがない場合はステータスコード400を返す', async () => {
      const request = new NextRequest('https://example.com/api/album-search')

      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body).toEqual({
        message: 'q is required',
        type: BffErrorType.BadRequest,
      })
    })

    it('クエリパラメータが不正な場合はステータスコード400を返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo&offset=invalid',
      )

      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body).toEqual({
        message: 'invalid query',
        type: BffErrorType.BadRequest,
      })
    })

    it('その他のエラーが発生した場合はステータスコード500を返す', async () => {
      const request = new NextRequest(
        'https://example.com/api/album-search?q=foo',
      )

      mockSearchAlbums.mockRejectedValueOnce(new Error('error'))

      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(500)
      expect(body).toEqual({
        message: 'Internal Server Error',
        type: BffErrorType.InternalServerError,
      })
    })
  })
})
