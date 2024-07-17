import { z } from 'zod'

export enum ApiErrorType {
  EntityNotFound = 'entity_not_found',
  EndpointNotFound = 'endpoint_not_found',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
}

export const apiErrorResponseSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(ApiErrorType),
})

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>
