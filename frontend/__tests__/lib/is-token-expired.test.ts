import { isTokenExpired } from '@/lib/is-token-expired'

describe('isTokenExpired', () => {
  test('トークンの有効期限が切れていない場合はfalseを返す', () => {
    const expiresIn = 3600
    const lastTokenFetchTime = new Date(new Date().getTime() - 3600 * 1000 + 1) // 59分59秒59ミリ秒前
    expect(isTokenExpired(expiresIn, lastTokenFetchTime)).toBe(false)
  })

  test('トークンの有効期限が切れている場合はtrueを返す', () => {
    const expiresIn = 3600
    const lastTokenFetchTime = new Date(new Date().getTime() - 3600 * 1000 - 1) // 1時間と1ミリ秒前
    expect(isTokenExpired(expiresIn, lastTokenFetchTime)).toBe(true)
  })

  test('トークンの有効期限がちょうど切れた場合はtrueを返す', () => {
    const expiresIn = 3600
    const lastTokenFetchTime = new Date(new Date().getTime() - 3600 * 1000) // ちょうど1時間前
    expect(isTokenExpired(expiresIn, lastTokenFetchTime)).toBe(true)
  })
})
