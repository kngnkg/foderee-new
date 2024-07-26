import { paginationSchema } from '@/types/pagination'
import { userSchema } from '@/types/user'
import { z } from 'zod'

export const bffUserSchema = userSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type BffUser = z.infer<typeof bffUserSchema>

export const pagedBffUsers = paginationSchema.extend({
  users: z.array(bffUserSchema),
})

export type PagedBffUsers = z.infer<typeof pagedBffUsers>
