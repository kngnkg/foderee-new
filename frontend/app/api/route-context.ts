import { userNameSchema } from '@/types/user'
import { z } from 'zod'

export const userRouteContextSchema = z.object({
  params: z.object({
    username: userNameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>
