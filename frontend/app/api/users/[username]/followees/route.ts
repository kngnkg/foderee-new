import { errInternal, errNotFound } from '@/app/api/response'
import type { UserRouteContext } from '@/app/api/route-context'
import { userRouteContextSchema } from '@/app/api/route-context'
import { getPaginationParamsFromRequest } from '@/app/api/utils'
import { listFollowees } from '@/service/users/list-followees'
import { EntityNotFoundError } from '@/types/error'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const paginationParams = getPaginationParamsFromRequest(request)

    const usersWP = await listFollowees(params.username, paginationParams)

    return NextResponse.json(usersWP)
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      return errNotFound('user not found')
    }

    return errInternal(e)
  }
}
