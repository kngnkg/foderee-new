import {
  BffErrorResponseType,
  type BffErrorResponse,
} from '@/types/bff/error-response'
import { AppError, AppErrorType } from '@/types/error'
import { NextResponse } from 'next/server'

export const errResponse = (
  message: string,
  errType: BffErrorResponseType,
): NextResponse => {
  let statusCode = 500
  switch (errType) {
    case BffErrorResponseType.BadRequest:
      statusCode = 400
      break
    case BffErrorResponseType.EntityNotFound:
      statusCode = 404
      break
    case BffErrorResponseType.EndpointNotFound:
      statusCode = 404
      break
    case BffErrorResponseType.Forbidden:
      statusCode = 403
      break
    case BffErrorResponseType.Unauthorized:
      statusCode = 401
      break
    default: // InternalServerError
      statusCode = 500
      break
  }

  const body: BffErrorResponse = {
    message,
    type: errType,
  }
  return NextResponse.json(body, { status: statusCode })
}

export const handleError = (e: unknown): NextResponse => {
  const internalServerErrorResp = errResponse(
    'Internal Server Error',
    BffErrorResponseType.InternalServerError,
  )

  if (e instanceof Error) {
    if (e instanceof AppError) {
      switch (e.type) {
        case AppErrorType.InvalidRequestError:
          return errResponse(
            'Invalid query parameters',
            BffErrorResponseType.BadRequest,
          )
        case AppErrorType.EntityNotFoundError:
          return errResponse(
            'Entity not found',
            BffErrorResponseType.EntityNotFound,
          )
        case AppErrorType.UnknownError:
          console.error(`AppError: ${e.message}`, e.stack)
          return internalServerErrorResp
        default:
          console.error(`AppError: ${e.message}`)
          return internalServerErrorResp
      }
    }

    console.error(`error: ${e.message}`, e.stack)
    return internalServerErrorResp
  }

  // 不明なエラー
  console.error('unknown error: ', e)
  return internalServerErrorResp
}
