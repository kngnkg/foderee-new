import { AppError } from '@/types/error'
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

export const errInternal = (e: unknown) => {
  if (e instanceof Error) {
    if (e instanceof AppError) {
      console.error(`AppError: ${e.message}`)
    }

    console.error(`error: ${e.message}`)
  }

  console.error(`unknown error: ${e}`)

  return error('API request failed', 500)
}
