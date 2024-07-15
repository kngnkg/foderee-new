export class AppError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppError'
  }
}

export class EntityNotFoundError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = 'EntityNotFoundError'
  }
}
