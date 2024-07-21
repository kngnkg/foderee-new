import { AppError, AppErrorType } from '@/types/error'
import type { SearchParams } from '@/types/pagination'
import { searchParamsSchema } from '@/types/pagination'
import type { NextRequest } from 'next/server'
import { ZodError } from 'zod'

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
