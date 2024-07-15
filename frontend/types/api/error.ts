import { z } from 'zod'

export enum ApiErrorType {
  EntityNotFound = 'entity_not_found',
  EndpointNotFound = 'endpoint_not_found',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
}

export const apiErrorSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(ApiErrorType),
})

export type ApiError = z.infer<typeof apiErrorSchema>

export function isApiError(obj: unknown): obj is ApiError {
  return apiErrorSchema.safeParse(obj).success
}
