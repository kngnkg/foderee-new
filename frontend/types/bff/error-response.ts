import { z } from 'zod'

export enum BffErrorResponseType {
  EntityNotFound = 'entity_not_found',
  EndpointNotFound = 'endpoint_not_found',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  BadRequest = 'bad_request',
  InternalServerError = 'internal_server_error',
}

export const bffErrorResponseSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(BffErrorResponseType),
})

export type BffErrorResponse = z.infer<typeof bffErrorResponseSchema>
