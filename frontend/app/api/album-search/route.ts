import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { searchAlbums } from '@/service/albums/search-albums'
import { isSearchParams } from '@/types/pagination'
import { errBadRequest, errInternal, errNotFound } from '../response'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    if (!q) {
      return errBadRequest('q is required')
    }
    const offsetStr = searchParams.get('offset')
    const limitStr = searchParams.get('limit')

    const params = {
      q,
      offset: offsetStr ? parseInt(offsetStr) : undefined,
      limit: limitStr ? parseInt(limitStr) : undefined,
    }
    if (!isSearchParams(params)) {
      return errBadRequest('invalid query')
    }

    const albumsWP = await searchAlbums(params)
    if (!albumsWP) {
      return errNotFound('album not found')
    }

    return NextResponse.json(albumsWP)
  } catch (e) {
    return errInternal(e)
  }
}
