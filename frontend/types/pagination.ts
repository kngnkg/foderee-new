import { z } from 'zod'

export const paginationSchema = z.object({
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(0).max(100).default(20),
  total: z.number().int().min(0),
})

export type Pagination = z.infer<typeof paginationSchema>

export function isPagination(input: unknown): input is Pagination {
  return paginationSchema.safeParse(input).success
}

export const paginationParamsSchema = paginationSchema
  .omit({ total: true })
  .partial()

export type PaginationParams = z.infer<typeof paginationParamsSchema>

export function isPaginationParams(input: unknown): input is PaginationParams {
  return paginationParamsSchema.safeParse(input).success
}

export const searchParamsSchema = paginationParamsSchema.extend({
  q: z.string().min(1).max(100),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

export function isSearchParams(input: unknown): input is SearchParams {
  return searchParamsSchema.safeParse(input).success
}
