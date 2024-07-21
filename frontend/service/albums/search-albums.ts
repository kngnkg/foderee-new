import { spotifyClient } from '@/lib/spotify/spotify-client'
import { toAlbumSimplified } from '@/lib/transform/album'
import type { PagedAlbums } from '@/types/album'
import type { SearchParams } from '@/types/pagination'

export const searchAlbums = async (
  params: SearchParams,
): Promise<PagedAlbums> => {
  try {
    const resp = await spotifyClient.searchAlbums(params)

    return {
      albums: resp.albums.items.map((item) => toAlbumSimplified(item)),
      total: resp.albums.total,
      offset: resp.albums.offset,
      limit: resp.albums.limit,
    }
  } catch (e) {
    throw e
  }
}
