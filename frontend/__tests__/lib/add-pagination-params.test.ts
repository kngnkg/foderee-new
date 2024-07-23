import {
  addPaginationParams,
  addSearchParams,
} from '@/lib/add-pagination-params'

describe('addPaginationParams', () => {
  it('offsetとlimitが指定されている場合はURLにクエリパラメータを追加する', () => {
    const url = 'http://example.com/api/users/testuser/followees'
    const params = {
      offset: 10,
      limit: 20,
    }

    const expected = `${url}?offset=10&limit=20`

    expect(addPaginationParams(url, params)).toBe(expected)
  })

  describe('offsetが指定されている場合', () => {
    it('offsetが指定されている場合はURLにoffsetのクエリパラメータを追加する', () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        offset: 10,
        limit: undefined,
      }

      const expected = `${url}?offset=10`

      expect(addPaginationParams(url, params)).toBe(expected)
    })

    it('offsetが0の場合はURLにoffsetのクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        offset: 0,
        limit: undefined,
      }

      const expected = `${url}?offset=0`

      expect(addPaginationParams(url, params)).toBe(expected)
    })
  })

  describe('limitが指定されている場合', () => {
    it('limitが指定されている場合はURLにlimitのクエリパラメータを追加する', () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        offset: undefined,
        limit: 20,
      }

      const expected = `${url}?limit=20`

      expect(addPaginationParams(url, params)).toBe(expected)
    })

    it('limitが0の場合はlimitにクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        offset: undefined,
        limit: 0,
      }

      const expected = `${url}?limit=0`

      expect(addPaginationParams(url, params)).toBe(expected)
    })
  })

  it('offsetとlimitが指定されていない場合はURLをそのまま返す', () => {
    const url = 'http://example.com/api/users/testuser/followees'
    const params = {
      offset: undefined,
      limit: undefined,
    }

    expect(addPaginationParams(url, params)).toBe(url)
  })
})

describe('addSearchParams', () => {
  describe('qが指定されていない場合', () => {
    it('qが指定されていない場合はURLをそのまま返す', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: '',
        offset: undefined,
        limit: undefined,
      }

      expect(addSearchParams(url, params)).toBe(url)
    })
  })

  describe('qのみ指定されている場合', () => {
    it('qのみ指定されている場合はURLにqのクエリパラメータのみを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: 'test',
        offset: undefined,
        limit: undefined,
      }

      const expected = `${url}?q=test`

      expect(addSearchParams(url, params)).toBe(expected)
    })

    it('qが空文字の場合はURLをそのまま返す', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: '',
        offset: undefined,
        limit: undefined,
      }

      expect(addSearchParams(url, params)).toBe(url)
    })
  })

  describe('qとoffsetのみが指定されている場合', () => {
    it('qとoffsetのみが指定されている場合はURLにoffsetのクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: 'test',
        offset: 10,
        limit: undefined,
      }

      const expected = `${url}?q=test&offset=10`

      expect(addSearchParams(url, params)).toBe(expected)
    })

    it('offsetが0の場合はURLにoffsetのクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: 'test',
        offset: 0,
        limit: undefined,
      }

      const expected = `${url}?q=test&offset=0`

      expect(addSearchParams(url, params)).toBe(expected)
    })
  })

  describe('qとlimitのみが指定されている場合', () => {
    it('qとlimitのみが指定されている場合はURLにlimitのクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: 'test',
        offset: undefined,
        limit: 20,
      }

      const expected = `${url}?q=test&limit=20`

      expect(addSearchParams(url, params)).toBe(expected)
    })

    it('limitが0の場合はURLにlimitのクエリパラメータを追加する', async () => {
      const url = 'http://example.com/api/users/testuser/followees'
      const params = {
        q: 'test',
        offset: undefined,
        limit: 0,
      }

      const expected = `${url}?q=test&limit=0`

      expect(addSearchParams(url, params)).toBe(expected)
    })
  })

  it('q、offset、limitが指定されている場合はURLにすべてのクエリパラメータを追加する', async () => {
    const url = 'http://example.com/api/users/testuser/followees'
    const params = {
      q: 'test',
      offset: 10,
      limit: 20,
    }

    const expected = `${url}?q=test&offset=10&limit=20`

    expect(addSearchParams(url, params)).toBe(expected)
  })
})
