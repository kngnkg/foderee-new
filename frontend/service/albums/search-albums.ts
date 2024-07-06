import {
  setSpotifyClientAccessToken,
  spotifyClient,
  toAlbumSimplified,
} from '@/lib/spotify'
import type { AlbumsWithPagination } from '@/types/album'
import type { SearchParams } from '@/types/pagination'

export const searchAlbums = async (
  params: SearchParams,
): Promise<AlbumsWithPagination | null> => {
  try {
    await setSpotifyClientAccessToken(spotifyClient)
    const resp = await spotifyClient.searchAlbums(params.q, {
      limit: params.limit,
      offset: params.offset,
    })
    const data = resp.body

    if (!data || !data.albums) {
      throw new Error('Failed to fetch album')
    }

    return {
      albums: data.albums.items.map((item) => toAlbumSimplified(item)),
      total: data.albums.total,
      offset: data.albums.offset,
      limit: data.albums.limit,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
