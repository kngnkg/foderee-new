import { z } from 'zod'

export enum BffErrorType {
  EntityNotFound = 'entity_not_found',
  EndpointNotFound = 'endpoint_not_found',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  BadRequest = 'bad_request',
  InternalServerError = 'internal_server_error',
}

export const bffErrorSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(BffErrorType),
})

export type BffError = z.infer<typeof bffErrorSchema>

export function isBffError(obj: unknown): obj is BffError {
  return bffErrorSchema.safeParse(obj).success
}
