export function isTokenExpired(
  expiresIn: number,
  lastTokenFetchTime: Date,
): boolean {
  // 現在の日時を取得
  const currentTime = new Date()
  // トークンの有効期限をミリ秒単位で計算
  const tokenExpiryTime = lastTokenFetchTime.getTime() + expiresIn * 1000
  return currentTime.getTime() >= tokenExpiryTime
}
