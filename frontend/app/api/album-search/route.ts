import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getSearchParams } from '@/app/api/request'
import { handleError } from '@/app/api/response'
import { transformBffAlbumSimplified } from '@/lib/transform/bff-album'
import { searchAlbums } from '@/service/albums/search-albums'

export async function GET(request: NextRequest) {
  try {
    const params = getSearchParams(request)

    const pagedAlbums = await searchAlbums(params)

    return NextResponse.json({
      albums: pagedAlbums.albums.map((album) =>
        transformBffAlbumSimplified(album),
      ),
      offset: pagedAlbums.offset,
      limit: pagedAlbums.limit,
      total: pagedAlbums.total,
    })
  } catch (e) {
    return handleError(e)
  }
}
