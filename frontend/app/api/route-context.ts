import { usernameSchema } from '@/types/user'
import { z } from 'zod'

export const userRouteContextSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>
