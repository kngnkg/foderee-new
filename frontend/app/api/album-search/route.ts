import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { errInternal, errResponse } from '@/app/api/response'
import { searchAlbums } from '@/service/albums/search-albums'
import { BffErrorType } from '@/types/bff-error'
import { isSearchParams } from '@/types/pagination'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    if (!q) {
      return errResponse('q is required', BffErrorType.BadRequest)
    }
    const offsetStr = searchParams.get('offset')
    const limitStr = searchParams.get('limit')

    const params = {
      q,
      offset: offsetStr ? parseInt(offsetStr) : undefined,
      limit: limitStr ? parseInt(limitStr) : undefined,
    }
    if (!isSearchParams(params)) {
      return errResponse('invalid query', BffErrorType.BadRequest)
    }

    const pagedAlbums = await searchAlbums(params)
    if (!pagedAlbums) {
      return errResponse('album not found', BffErrorType.EntityNotFound)
    }

    return NextResponse.json(pagedAlbums)
  } catch (e) {
    return errInternal(e)
  }
}
