import { userSchema } from '@/types/user'
import { z } from 'zod'

export const bffUserSchema = userSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type BffUser = z.infer<typeof bffUserSchema>
