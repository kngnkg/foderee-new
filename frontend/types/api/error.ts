import { z } from 'zod'

export enum ErrorType {
  NotFound = 'not_found',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
}

export const errorSchema = z.object({
  message: z.string(),
  type: z.string(),
})
