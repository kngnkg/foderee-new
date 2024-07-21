import { AppError, AppErrorType } from '@/types/error'
import type { PaginationParams, SearchParams } from '@/types/pagination'
import { paginationParamsSchema, searchParamsSchema } from '@/types/pagination'
import { usernameSchema } from '@/types/user'
import type { NextRequest } from 'next/server'
import { z, ZodError } from 'zod'

export function getPaginationParams(request: NextRequest): PaginationParams {
  try {
    const paginationParams = request.nextUrl.searchParams
    const paramsObj = Object.fromEntries(paginationParams.entries())
    return paginationParamsSchema.parse(paramsObj)
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

export const userRouteContextSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>
