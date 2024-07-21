import { BffErrorType, type BffError } from '@/types/bff-error'
import { AppError, AppErrorType } from '@/types/error'
import { NextResponse } from 'next/server'

export const errResponse = (
  message: string,
  errType: BffErrorType,
): NextResponse => {
  let statusCode = 500
  switch (errType) {
    case BffErrorType.BadRequest:
      statusCode = 400
      break
    case BffErrorType.EntityNotFound:
      statusCode = 404
      break
    case BffErrorType.EndpointNotFound:
      statusCode = 404
      break
    case BffErrorType.Forbidden:
      statusCode = 403
      break
    case BffErrorType.Unauthorized:
      statusCode = 401
      break
    default: // InternalServerError
      statusCode = 500
      break
  }

  const body: BffError = {
    message,
    type: errType,
  }
  return NextResponse.json(body, { status: statusCode })
}

export const handleError = (e: unknown): NextResponse => {
  const internalServerErrorResp = errResponse(
    'Internal Server Error',
    BffErrorType.InternalServerError,
  )

  if (e instanceof Error) {
    if (e instanceof AppError) {
      switch (e.type) {
        case AppErrorType.InvalidRequestError:
          return errResponse(
            'Invalid query parameters',
            BffErrorType.BadRequest,
          )
        case AppErrorType.EntityNotFoundError:
          return errResponse('Entity not found', BffErrorType.EntityNotFound)
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
