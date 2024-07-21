/**
 * @jest-environment node
 */

import { getPaginationParams, getSearchParams } from '@/app/api/request'
import { AppError, AppErrorType } from '@/types/error'
import { NextRequest } from 'next/server'

describe('getSearchParams', () => {
  it('クエリパラメータが正常な場合はSearchParamsを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?q=bar&offset=0&limit=20',
    )

    const searchParams = getSearchParams(request)

    expect(searchParams).toEqual({
      q: 'bar',
      offset: 0,
      limit: 20,
    })
  })

  it('クエリパラメータにqがない場合はエラーを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?offset=0&limit=20',
    )

    try {
      const searchParams = getSearchParams(request)
      if (searchParams) {
        throw new Error('SearchParamsは返されるべきではありません')
      }
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
      expect((e as AppError).type).toBe(AppErrorType.InvalidRequestError)
    }
  })

  it('クエリパラメータにoffsetがない場合はoffsetにundefinedがセットされる', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?q=bar&limit=20',
    )

    const searchParams = getSearchParams(request)

    expect(searchParams).toEqual({
      q: 'bar',
      offset: undefined,
      limit: 20,
    })
  })

  it('クエリパラメータのoffsetが不正な場合はエラーを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?q=bar&offset=invalid&limit=20',
    )

    try {
      const searchParams = getSearchParams(request)
      if (searchParams) {
        throw new Error('SearchParamsは返されるべきではありません')
      }
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
      expect((e as AppError).type).toBe(AppErrorType.InvalidRequestError)
    }
  })

  it('クエリパラメータにlimitがない場合はlimitにundefinedがセットされる', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?q=bar&offset=0',
    )

    const searchParams = getSearchParams(request)

    expect(searchParams).toEqual({
      q: 'bar',
      offset: 0,
      limit: undefined,
    })
  })

  it('クエリパラメータのlimitが不正な場合はエラーを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?q=bar&offset=0&limit=invalid',
    )

    try {
      const searchParams = getSearchParams(request)
      if (searchParams) {
        throw new Error('SearchParamsは返されるべきではありません')
      }
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
      expect((e as AppError).type).toBe(AppErrorType.InvalidRequestError)
    }
  })
})

describe('getPaginationParams', () => {
  it('クエリパラメータが正常な場合はPaginationParamsを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?offset=0&limit=20',
    )

    const paginationParams = getPaginationParams(request)

    expect(paginationParams).toEqual({
      offset: 0,
      limit: 20,
    })
  })

  it('クエリパラメータにoffsetがない場合はoffsetにundefinedがセットされる', async () => {
    const request = new NextRequest('https://example.com/api/foo?limit=20')

    const paginationParams = getPaginationParams(request)

    expect(paginationParams).toEqual({
      offset: undefined,
      limit: 20,
    })
  })

  it('クエリパラメータのoffsetが不正な場合はエラーを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?offset=invalid&limit=20',
    )

    try {
      const paginationParams = getPaginationParams(request)
      if (paginationParams) {
        throw new Error('PaginationParamsは返されるべきではありません')
      }
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
      expect((e as AppError).type).toBe(AppErrorType.InvalidRequestError)
    }
  })

  it('クエリパラメータにlimitがない場合はlimitにundefinedがセットされる', async () => {
    const request = new NextRequest('https://example.com/api/foo?offset=0')

    const paginationParams = getPaginationParams(request)

    expect(paginationParams).toEqual({
      offset: 0,
      limit: undefined,
    })
  })

  it('クエリパラメータのlimitが不正な場合はエラーを返す', async () => {
    const request = new NextRequest(
      'https://example.com/api/foo?offset=0&limit=invalid',
    )

    try {
      const paginationParams = getPaginationParams(request)
      if (paginationParams) {
        throw new Error('PaginationParamsは返されるべきではありません')
      }
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
      expect((e as AppError).type).toBe(AppErrorType.InvalidRequestError)
    }
  })
})
