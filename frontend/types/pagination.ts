import { z } from 'zod'

export const paginationSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
})

export type Pagination = z.infer<typeof paginationSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPagination(input: any): input is Pagination {
  return paginationSchema.safeParse(input).success
}

export const paginationParamsSchema = z.object({
  offset: z.number().nullable(),
  limit: z.number().nullable(),
})

export type PaginationParams = z.infer<typeof paginationParamsSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPaginationParams(input: any): input is PaginationParams {
  return paginationParamsSchema.safeParse(input).success
}

export const searchParamsSchema = paginationParamsSchema.extend({
  q: z.string().min(1).max(100),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSearchParams(input: any): input is SearchParams {
  return searchParamsSchema.safeParse(input).success
}
