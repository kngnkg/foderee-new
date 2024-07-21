/**
 * @jest-environment node
 */

import { errResponse, handleError } from '@/app/api/response'
import { BffErrorType } from '@/types/bff-error'
import { AppError, AppErrorType } from '@/types/error'

describe('errResponse', () => {
  it('エラータイプが正しくセットされること', async () => {
    const response = errResponse(
      'Internal Server Error',
      BffErrorType.InternalServerError,
    )
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({
      message: 'Internal Server Error',
      type: BffErrorType.InternalServerError,
    })
  })

  describe('エラータイプによる分岐', () => {
    it('リクエストが不正な場合はステータスコード400を返す', async () => {
      const response = errResponse(
        'Invalid query parameters',
        BffErrorType.BadRequest,
      )
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body).toEqual({
        message: 'Invalid query parameters',
        type: BffErrorType.BadRequest,
      })
    })

    it('エンティティが見つからなかった場合はステータスコード404を返す', async () => {
      const response = errResponse(
        'Entity not found',
        BffErrorType.EntityNotFound,
      )
      const body = await response.json()

      expect(response.status).toBe(404)
      expect(body).toEqual({
        message: 'Entity not found',
        type: BffErrorType.EntityNotFound,
      })
    })

    it('エンドポイントが見つからなかった場合はステータスコード404を返す', async () => {
      const response = errResponse(
        'Endpoint not found',
        BffErrorType.EndpointNotFound,
      )
      const body = await response.json()

      expect(response.status).toBe(404)
      expect(body).toEqual({
        message: 'Endpoint not found',
        type: BffErrorType.EndpointNotFound,
      })
    })

    it('アクセスが拒否された場合はステータスコード403を返す', async () => {
      const response = errResponse('Forbidden', BffErrorType.Forbidden)
      const body = await response.json()

      expect(response.status).toBe(403)
      expect(body).toEqual({
        message: 'Forbidden',
        type: BffErrorType.Forbidden,
      })
    })

    it('認証が必要な場合はステータスコード401を返す', async () => {
      const response = errResponse('Unauthorized', BffErrorType.Unauthorized)
      const body = await response.json()

      expect(response.status).toBe(401)
      expect(body).toEqual({
        message: 'Unauthorized',
        type: BffErrorType.Unauthorized,
      })
    })

    it('その他のエラーの場合はステータスコード500を返す', async () => {
      const response = errResponse(
        'Internal Server Error',
        BffErrorType.InternalServerError,
      )
      const body = await response.json()

      expect(response.status).toBe(500)
      expect(body).toEqual({
        message: 'Internal Server Error',
        type: BffErrorType.InternalServerError,
      })
    })
  })
})

describe('handleError', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('AppErrorの場合', () => {
    it('リクエストが不正な場合はBadRequestを返す', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const invalidRequestError = new AppError(
        'Invalid query parameters',
        AppErrorType.InvalidRequestError,
      )

      const response = handleError(invalidRequestError)
      const body = await response.json()

      expect(consoleErrorSpy).not.toHaveBeenCalled()
      expect(response.status).toBe(400)
      expect(body).toEqual({
        message: 'Invalid query parameters',
        type: BffErrorType.BadRequest,
      })
    })

    it('エンティティが見つからなかった場合はEntityNotFoundを返す', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const entityNotFoundError = new AppError(
        'Entity not found',
        AppErrorType.EntityNotFoundError,
      )

      const response = handleError(entityNotFoundError)
      const body = await response.json()

      expect(consoleErrorSpy).not.toHaveBeenCalled()
      expect(response.status).toBe(404)
      expect(body).toEqual({
        message: 'Entity not found',
        type: BffErrorType.EntityNotFound,
      })
    })

    it('UnknownErrorの場合はコンソールに出力してInternalServerErrorを返す', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const otherAppError = new AppError(
        'other app error',
        AppErrorType.UnknownError,
      )

      const response = handleError(otherAppError)
      const body = await response.json()

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'AppError: other app error',
        otherAppError.stack, // スタックトレースも出力する
      )
      expect(response.status).toBe(500)
      expect(body).toEqual({
        message: 'Internal Server Error',
        type: BffErrorType.InternalServerError,
      })
    })
  })

  it('その他のAppErrorの場合はコンソールに出力してInternalServerErrorを返す', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const otherAppError = new AppError(
      'other app error',
      AppErrorType.SpotifyError,
    )

    const response = handleError(otherAppError)
    const body = await response.json()

    expect(consoleErrorSpy).toHaveBeenCalledWith('AppError: other app error')
    expect(response.status).toBe(500)
    expect(body).toEqual({
      message: 'Internal Server Error',
      type: BffErrorType.InternalServerError,
    })
  })
})

it('AppError以外のエラーの場合はコンソールに出力してInternalServerErrorを返す', async () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})
  const otherError = new Error('other error')

  const response = handleError(otherError)
  const body = await response.json()

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'error: other error',
    otherError.stack, // スタックトレースも出力する
  )
  expect(response.status).toBe(500)
  expect(body).toEqual({
    message: 'Internal Server Error',
    type: BffErrorType.InternalServerError,
  })
})

it('Error型以外が投げられた場合はコンソールに出力してInternalServerErrorを返す', async () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})
  const unknownError = 'unknown error'

  const response = handleError(unknownError)
  const body = await response.json()

  expect(consoleErrorSpy).toHaveBeenCalledWith('unknown error: ', unknownError)
  expect(response.status).toBe(500)
  expect(body).toEqual({
    message: 'Internal Server Error',
    type: BffErrorType.InternalServerError,
  })
})