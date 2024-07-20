import { BffErrorType, type BffError } from '@/types/bff-error'
import { AppError } from '@/types/error'
import { NextResponse } from 'next/server'

export const errResponse = (message: string, errType: BffErrorType) => {
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

export const errInternal = (e: unknown) => {
  if (e instanceof Error) {
    if (e instanceof AppError) {
      console.error(`AppError: ${e.message}`)
    }

    console.error(`error: ${e.message}`)
  }

  console.error(`unknown error: ${e}`)

  return errResponse('Internal Server Error', BffErrorType.InternalServerError)
}
