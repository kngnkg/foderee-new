/**
 * @jest-environment node
 */

import { env } from '@/env.mjs'
import { serverFetcher } from '@/lib/server-fetcher'
import { spotifyClient } from '@/lib/spotify/spotify-client'
import { generateSpotifySingleAlbumResponseForTest } from '@/lib/testutil/albums'
import { generateApiReviewForTest } from '@/lib/testutil/reviews'
import { toReview } from '@/lib/transform/review'
import { getReview } from '@/service/reviews/get-review'
import { AppError, AppErrorType } from '@/types/error'

jest.mock('@/lib/server-fetcher', () => ({
  serverFetcher: jest.fn(),
}))

jest.mock('@/lib/spotify/spotify-client', () => {
  return {
    spotifyClient: {
      getAlbum: jest.fn(),
    },
  }
})

jest.mock('@/env.mjs', () => ({
  env: {
    API_URL: 'http://example.com/api',
  },
}))

describe('getReview', () => {
  const mockServerFetcher = serverFetcher as jest.Mock
  const mockgetAlbum = spotifyClient.getAlbum as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('レビューが存在する場合はレビューデータを返す', async () => {
    const mockAlbumData = generateSpotifySingleAlbumResponseForTest()
    const validReviewId = 'b4606453-f786-42ae-a073-2d7afe9c94c5'
    const mockReviewData = generateApiReviewForTest({
      review_id: validReviewId,
      album_id: mockAlbumData.id,
    })

    mockServerFetcher.mockResolvedValueOnce(mockReviewData)
    mockgetAlbum.mockResolvedValueOnce(mockAlbumData)

    const review = await getReview(validReviewId)

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/reviews/${validReviewId}`,
      { cache: 'no-store' },
    )
    expect(mockgetAlbum).toHaveBeenCalledWith(mockReviewData.album_id)

    const expected = toReview(mockReviewData, mockAlbumData)
    expect(review).toEqual(expected)
  })

  it('レビューが存在しない場合はエラーを投げる', async () => {
    mockServerFetcher.mockRejectedValueOnce(
      new AppError('', AppErrorType.EntityNotFoundError),
    )
    const invalidReviewId = 'a3bb189e-8bf9-3888-9912-ace4e6543002'

    const errObj = await getReview(invalidReviewId).catch((e) => e)
    expect(errObj).toBeInstanceOf(AppError)

    expect((errObj as AppError).type).toBe(AppErrorType.EntityNotFoundError)

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/reviews/${invalidReviewId}`,
      { cache: 'no-store' },
    )
  })

  it('受け取ったレビューデータが不正な場合はエラーを投げる', async () => {
    const mockInvalidData = {
      invalidProperty: 'invalid',
    }
    mockServerFetcher.mockResolvedValueOnce(mockInvalidData)
    const validReviewId = 'b4606453-f786-42ae-a073-2d7afe9c94c5'

    const errObj = await getReview(validReviewId).catch((e) => e)

    expect(errObj).toBeInstanceOf(AppError)
    expect((errObj as AppError).type).toBe(
      AppErrorType.InvalidDataReceivedError,
    )

    expect(mockServerFetcher).toHaveBeenCalledWith(
      `${env.API_URL}/reviews/${validReviewId}`,
      { cache: 'no-store' },
    )
  })

  it('レビュー対象のアルバムが存在しない場合はエラーを投げる', async () => {
    const validReviewId = 'b4606453-f786-42ae-a073-2d7afe9c94c5'
    const mockReviewData = generateApiReviewForTest({
      review_id: validReviewId,
    })
    mockServerFetcher.mockResolvedValueOnce(mockReviewData)
    const notFoundError = new AppError(
      '',
      AppErrorType.SpotifyResourceNotFoundError,
    )
    mockgetAlbum.mockRejectedValueOnce(notFoundError)

    const errObj = await getReview(validReviewId).catch((e) => e)

    expect(errObj).toBe(notFoundError)
  })

  it('その他のエラーの場合はエラーをそのまま投げる', async () => {
    const validReviewId = 'b4606453-f786-42ae-a073-2d7afe9c94c5'
    const mockReviewData = generateApiReviewForTest({
      review_id: validReviewId,
    })
    mockServerFetcher.mockResolvedValueOnce(mockReviewData)
    const otherError = new Error('other error')
    mockgetAlbum.mockRejectedValueOnce(otherError)

    const errObj = await getReview(validReviewId).catch((e) => e)

    expect(errObj).toBe(otherError)
  })
})
