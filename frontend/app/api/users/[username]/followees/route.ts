import * as z from 'zod'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { errInternal, errNotFound } from '@/app/api/response'
import { getCursorFromRequest } from '@/app/api/utils'
import { listFollowees } from '@/service/users/list-followees'
import { userNameSchema } from '@/types/user'

export const userRouteContextSchema = z.object({
  params: z.object({
    username: userNameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const cursor = getCursorFromRequest(request)

    const resp = await listFollowees(params.username, cursor)
    if (!resp) {
      return errNotFound('user not found')
    }

    return NextResponse.json({
      users: resp.users,
      nextCursor: resp.nextCursor,
      total: resp.total,
    })
  } catch (e) {
    console.error(e)
    return errInternal('internal error')
  }
}
