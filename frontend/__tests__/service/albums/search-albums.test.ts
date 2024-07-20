/**
 * @jest-environment node
 */

import { spotifyClient } from '@/lib/spotify/spotify-client'
import { generateSpotifyAlbumSearchResponseForTest } from '@/lib/testutil/albums'
import { toAlbumSimplified } from '@/lib/transform/album'
import { searchAlbums } from '@/service/albums/search-albums'

jest.mock('@/lib/spotify/spotify-client', () => {
  return {
    spotifyClient: {
      searchAlbums: jest.fn(),
    },
  }
})

describe('searchAlbums', () => {
  const mockSearchAlbums = spotifyClient.searchAlbums as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('アルバムが存在する場合はアルバムリストを返す', async () => {
    const mockAlbumData = generateSpotifyAlbumSearchResponseForTest()
    const expected = {
      albums: mockAlbumData.albums.items.map((item) => toAlbumSimplified(item)),
      total: mockAlbumData.albums.total,
      offset: mockAlbumData.albums.offset,
      limit: mockAlbumData.albums.limit,
    }
    mockSearchAlbums.mockResolvedValueOnce(mockAlbumData)
    const params = { q: 'test', limit: 20, offset: 0 }

    const albums = await searchAlbums(params)

    expect(mockSearchAlbums).toHaveBeenCalledWith(params)
    expect(albums).toEqual(expected)
  })

  it('アルバムが存在しない場合は空のアルバムリストを返す', async () => {
    const mockAlbumData = {
      albums: {
        items: [],
        total: 0,
        offset: 0,
        limit: 20,
      },
    }
    const expected = {
      albums: [],
      total: 0,
      offset: 0,
      limit: 20,
    }
    mockSearchAlbums.mockResolvedValueOnce(mockAlbumData)
    const params = { q: 'test', limit: 20, offset: 0 }

    const albums = await searchAlbums(params)

    expect(mockSearchAlbums).toHaveBeenCalledWith(params)
    expect(albums).toEqual(expected)
  })

  it('その他のエラーの場合はエラーをそのまま投げる', async () => {
    const otherError = new Error('error')
    mockSearchAlbums.mockRejectedValueOnce(otherError)
    const params = { q: 'test', limit: 20, offset: 0 }

    const errObj = await searchAlbums(params).catch((e) => e)

    expect(errObj).toBe(otherError)
  })
})
