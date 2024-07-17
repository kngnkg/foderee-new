export class AppError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppError'
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    public type: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class EntityNotFoundError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = 'EntityNotFoundError'
  }
}

export class InvalidDataReceivedError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidDataReceivedError'
  }
}
export class SpotifyResourceNotFoundError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = 'SpotifyResourceNotFoundError'
  }
}
