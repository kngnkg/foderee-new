import type { UserRouteContext } from '@/app/api/request'
import { getPaginationParams, userRouteContextSchema } from '@/app/api/request'
import { errResponse, handleError } from '@/app/api/response'
import { transformBffUser } from '@/lib/transform/bff-user'
import { listFollowees } from '@/service/users/list-followees'
import { BffErrorType } from '@/types/bff-error'
import { AppError, AppErrorType } from '@/types/error'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)
    const paginationParams = getPaginationParams(request)

    const pagedUsers = await listFollowees(params.username, paginationParams)

    return NextResponse.json({
      users: pagedUsers.users.map((user) => transformBffUser(user)),
      offset: pagedUsers.offset,
      limit: pagedUsers.limit,
      total: pagedUsers.total,
    })
  } catch (e) {
    if (e instanceof ZodError) {
      return errResponse('Invalid username', BffErrorType.BadRequest)
    }

    if (e instanceof AppError && e.type === AppErrorType.EntityNotFoundError) {
      return errResponse('User not found', BffErrorType.EntityNotFound)
    }

    return handleError(e)
  }
}
