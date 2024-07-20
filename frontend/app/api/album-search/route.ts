import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { errInternal, errResponse } from '@/app/api/response'
import { transformBffAlbumSimplified } from '@/lib/transform/bff-album'
import { searchAlbums } from '@/service/albums/search-albums'
import { BffErrorType } from '@/types/bff-error'
import { searchParamsSchema } from '@/types/pagination'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const paramsObj = Object.fromEntries(searchParams.entries())
    const params = searchParamsSchema.parse(paramsObj)

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
    if (e instanceof ZodError) {
      // qがない場合
      if (e.errors.length === 1 && e.errors[0].path[0] === 'q') {
        return errResponse('q is required', BffErrorType.BadRequest)
      }

      return errResponse('invalid query', BffErrorType.BadRequest)
    }

    return errInternal(e)
  }
}
