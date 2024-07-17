import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { toUser } from '@/lib/transform/user'
import { apiUserSchema } from '@/types/api/user'
import { EntityNotFoundError, InvalidDataReceivedError } from '@/types/error'
import type { User } from '@/types/user'
import { ZodError } from 'zod'

export const getUser = async (username: string): Promise<User> => {
  try {
    const data = await serverFetcher(`${env.API_URL}/users/${username}`, {
      cache: 'no-store',
    })

    const apiUser = apiUserSchema.parse(data)

    return toUser(apiUser)
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      throw new EntityNotFoundError(
        `ユーザー${username}が存在しません: ${e.message}`,
      )
    }

    if (e instanceof ZodError) {
      throw new InvalidDataReceivedError(
        `APIからのデータが不正です: ${e.message}`,
      )
    }

    throw e
  }
}
