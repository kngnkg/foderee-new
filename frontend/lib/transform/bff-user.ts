import type { User } from '@/types/user'
import { isUser } from '@/types/user'

export const transformUser = (data: unknown): User => {
  if (!isUser(data)) {
    throw new Error('User is invalid')
  }

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}
