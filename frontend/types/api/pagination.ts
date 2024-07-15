import { z } from 'zod'

export const apiPaginationSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
})

export type ApiPagination = z.infer<typeof apiPaginationSchema>

export function isApiPagination(input: unknown): input is ApiPagination {
  return apiPaginationSchema.safeParse(input).success
}

export const apiPaginationParamsSchema = apiPaginationSchema.pick({
  offset: true,
  limit: true,
})

export type ApiPaginationParams = z.infer<typeof apiPaginationParamsSchema>

export function isApiPaginationParams(
  input: unknown,
): input is ApiPaginationParams {
  return apiPaginationParamsSchema.safeParse(input).success
}

export const apiSearchParamsSchema = apiPaginationParamsSchema.extend({
  q: z.string().min(1).max(100),
})

export type ApiSearchParams = z.infer<typeof apiSearchParamsSchema>

export function isApiSearchParams(input: unknown): input is ApiSearchParams {
  return apiSearchParamsSchema.safeParse(input).success
}
