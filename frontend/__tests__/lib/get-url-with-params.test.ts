import {
  getURLWithPaginationParams,
  getURLWithSearchParams,
} from '@/lib/get-url-with-params'

describe('getURLWithPaginationParams', () => {
  it('次のページのoffsetが正しく設定される', async () => {
    const endpoint = 'http://example.com/api/users/testuser/followees'
    const limit = 20
    const pageIndex = 2
    const previousPage = {
      offset: 20,
      limit: 20,
      total: 60,
    }

    const expected = `${endpoint}?offset=40&limit=20`

    expect(
      getURLWithPaginationParams(endpoint, limit, pageIndex, previousPage),
    ).toBe(expected)
  })

  it('直前のページが既に最後のページに到達していた場合はnullを返す', async () => {
    const endpoint = 'http://example.com/api/users/testuser/followees'
    const limit = 20
    const pageIndex = 3
    const previousPage = {
      offset: 60,
      limit: 20,
      total: 60,
    }

    expect(
      getURLWithPaginationParams(endpoint, limit, pageIndex, previousPage),
    ).toBeNull()
  })

  it('最初のページの場合はoffsetが0に設定される', async () => {
    const endpoint = 'http://example.com/api/users/testuser/followees'
    const limit = 20
    const pageIndex = 0
    const previousPage = {
      offset: 0,
      limit: 20,
      total: 60,
    }

    const expected = `${endpoint}?offset=0&limit=20`

    expect(
      getURLWithPaginationParams(endpoint, limit, pageIndex, previousPage),
    ).toBe(expected)
  })
})

describe('getURLWithSearchParams', () => {
  it('検索クエリと次のページのoffsetが正しく設定される', async () => {
    const endpoint = 'http://example.com/api/albums'
    const query = 'test'
    const limit = 20
    const pageIndex = 2
    const previousPage = {
      offset: 20,
      limit: 20,
      total: 60,
    }

    const expected = `${endpoint}?q=test&offset=40&limit=20`

    expect(
      getURLWithSearchParams(endpoint, query, limit, pageIndex, previousPage),
    ).toBe(expected)
  })

  it('検索クエリが空文字の場合はnullを返す', async () => {
    const endpoint = 'http://example.com/api/albums'
    const query = ''
    const limit = 20
    const pageIndex = 2
    const previousPage = {
      offset: 20,
      limit: 20,
      total: 60,
    }

    expect(
      getURLWithSearchParams(endpoint, query, limit, pageIndex, previousPage),
    ).toBeNull()
  })

  it('直前のページが既に最後のページに到達していた場合はnullを返す', async () => {
    const endpoint = 'http://example.com/api/albums'
    const query = 'test'
    const limit = 20
    const pageIndex = 3
    const previousPage = {
      offset: 60,
      limit: 20,
      total: 60,
    }

    expect(
      getURLWithSearchParams(endpoint, query, limit, pageIndex, previousPage),
    ).toBeNull()
  })

  it('最初のページの場合はoffsetが0に設定される', async () => {
    const endpoint = 'http://example.com/api/albums'
    const query = 'test'
    const limit = 20
    const pageIndex = 0
    const previousPage = {
      offset: 0,
      limit: 20,
      total: 60,
    }

    const expected = `${endpoint}?q=test&offset=0&limit=20`

    expect(
      getURLWithSearchParams(endpoint, query, limit, pageIndex, previousPage),
    ).toBe(expected)
  })
})
