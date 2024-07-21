import { z } from 'zod'

export const paginationSchema = z.object({
  offset: z.number().int().min(0).max(1000).default(0),
  limit: z.number().int().min(0).max(50).default(20),
  total: z.number().int().min(0),
})

export type Pagination = z.infer<typeof paginationSchema>

export const paginationParamsSchema = z
  .object({
    offset: z.preprocess((v) => Number(v), paginationSchema.shape.offset),
    limit: z.preprocess((v) => Number(v), paginationSchema.shape.limit),
  })
  .partial()

export type PaginationParams = z.infer<typeof paginationParamsSchema>

export const searchParamsSchema = paginationParamsSchema.extend({
  q: z.string().min(1).max(100),
})

export type SearchParams = z.infer<typeof searchParamsSchema>
