import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { errInternal, errNotFound } from '@/app/api/response'
import type { UserRouteContext } from '@/app/api/route-context'
import { userRouteContextSchema } from '@/app/api/route-context'
import { getCursorFromRequest } from '@/app/api/utils'
import { listFollowees } from '@/service/users/list-followees'

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const cursor = getCursorFromRequest(request)

    const usersWP = await listFollowees(params.username, cursor)
    if (!usersWP) {
      return errNotFound('user not found')
    }

    return NextResponse.json(usersWP)
  } catch (e) {
    console.error(e)
    return errInternal('internal error')
  }
}
