import { errInternal, errResponse } from '@/app/api/response'
import type { UserRouteContext } from '@/app/api/route-context'
import { userRouteContextSchema } from '@/app/api/route-context'
import { getPaginationParamsFromRequest } from '@/app/api/utils'
import { listFollowees } from '@/service/users/list-followees'
import { BffErrorType } from '@/types/bff-error'
import { AppError, AppErrorType } from '@/types/error'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const paginationParams = getPaginationParamsFromRequest(request)

    const usersWP = await listFollowees(params.username, paginationParams)

    return NextResponse.json(usersWP)
  } catch (e) {
    if (e instanceof AppError && e.type === AppErrorType.EntityNotFoundError) {
      return errResponse('user not found', BffErrorType.EntityNotFound)
    }

    return errInternal(e)
  }
}
