export const AppErrorType = {
  UnknownError: 'UnknownError',
  ApiError: 'ApiError',
  EntityNotFoundError: 'EntityNotFoundError',
  InvalidDataReceivedError: 'InvalidDataReceivedError',
  SpotifyError: 'SpotifyError',
  SpotifyRateLimitError: 'SpotifyRateLimitError',
  SpotifyResourceNotFoundError: 'SpotifyResourceNotFoundError',
  RetryLimitExceededError: 'RetryLimitExceededError',
} as const

export type AppErrorType = (typeof AppErrorType)[keyof typeof AppErrorType]

export class AppError extends Error {
  type: AppErrorType = AppErrorType.UnknownError
  constructor(message: string, type: AppErrorType = AppErrorType.UnknownError) {
    super(message)
    this.name = 'AppError'
    this.type = type
  }
}
