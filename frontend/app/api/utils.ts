import type { User } from '@/types/user'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

export const cursorSchema = z.object({
  cursor: z.string().uuid().nullish(),
  limit: z.number().nullish(),
})

export type Cursor = z.infer<typeof cursorSchema>

export function getCursorFromRequest(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const cursor = searchParams.get('cursor')
  const limitStr = searchParams.get('limit')
  const limit = limitStr ? parseInt(limitStr) : null

  return cursorSchema.parse({ cursor, limit })
}

// TODO: 場所を変える
export type UserListResponse = {
  users: User[]
  nextCursor: string | undefined
  total: number
}

export function addUrlParams(url: string, cursor: Cursor) {
  if (cursor.cursor || cursor.limit) {
    url += '?'
    if (cursor.cursor) {
      url += `cursor=${cursor.cursor}&`
    }
    if (cursor.limit) {
      url += `limit=${cursor.limit}`
    }
    url = url.replace(/&$/, '')
  }
  return url
}
