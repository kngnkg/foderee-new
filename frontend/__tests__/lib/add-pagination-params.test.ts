import { addPaginationParams } from '@/lib/add-pagination-params'

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
