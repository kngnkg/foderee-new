import { AppError, AppErrorType } from '@/types/error'
import type { PaginationParams, SearchParams } from '@/types/pagination'
import { searchParamsSchema } from '@/types/pagination'
import { usernameSchema } from '@/types/user'
import type { NextRequest } from 'next/server'
import { ZodError, z } from 'zod'

export const getSearchParams = (request: NextRequest): SearchParams => {
  try {
    const searchParams = request.nextUrl.searchParams
    const paramsObj = Object.fromEntries(searchParams.entries())
    return searchParamsSchema.parse(paramsObj)
  } catch (e) {
    if (e instanceof ZodError) {
      throw new AppError(
        'Invalid query parameters',
        AppErrorType.InvalidRequestError,
      )
    }

    throw e
  }
}

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

export const userRouteContextSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>
