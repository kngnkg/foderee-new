import { hasFetchedAllPages } from '@/lib/has-fetched-all-pages'
import type { Pagination } from '@/types/pagination'

describe('hasFetchedAllPages', () => {
  it('dataがundefinedならfalseを返す', () => {
    expect(hasFetchedAllPages(undefined)).toBe(false)
  })

  it('dataが空の配列ならfalseを返す', () => {
    expect(hasFetchedAllPages([])).toBe(false)
  })

  it('最初のページの合計が0の場合はtrueを返す', () => {
    const data: Pagination[] = [{ total: 0, offset: 0, limit: 10 }]
    expect(hasFetchedAllPages(data)).toBe(true)
  })

  it('最後のページオフセットが合計値以上であればtrueを返す', () => {
    const data: Pagination[] = [
      { total: 100, offset: 0, limit: 10 },
      { total: 100, offset: 100, limit: 10 },
    ]
    expect(hasFetchedAllPages(data)).toBe(true)
  })

  it('最後のページオフセットが合計より小さい場合はfalse を返す', () => {
    const data: Pagination[] = [
      { total: 100, offset: 0, limit: 10 },
      { total: 100, offset: 90, limit: 10 },
    ]
    expect(hasFetchedAllPages(data)).toBe(false)
  })
})
