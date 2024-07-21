import type { BffUser } from '@/types/bff/users'
import type { User } from '@/types/user'

export const transformUser = (data: BffUser): User => {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

export const transformBffUser = (data: User): BffUser => {
  return {
    ...data,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  }
}
