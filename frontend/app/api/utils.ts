import type { PaginationParams } from '@/types/pagination'
import type { NextRequest } from 'next/server'

export function getPaginationParamsFromRequest(
  request: NextRequest,
): PaginationParams {
  const searchParams = request.nextUrl.searchParams
  const offsetStr = searchParams.get('offset')
  const limitStr = searchParams.get('limit')

  return {
    offset: offsetStr ? parseInt(offsetStr) : undefined,
    limit: limitStr ? parseInt(limitStr) : undefined,
  }
}
