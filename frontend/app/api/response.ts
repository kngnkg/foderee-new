import { NextResponse } from 'next/server'

export const error = (message: string, statusCode: number) => {
  return NextResponse.json(
    {
      error: {
        message,
      },
    },
    { status: statusCode },
  )
}

export const errBadRequest = (message: string) => {
  return error(message, 400)
}

export const errUnauthorized = (message: string) => {
  return error(message, 401)
}

export const errNotFound = (message: string) => {
  return error(message, 404)
}

export const errInternal = (message: string) => {
  return error(message, 500)
}
