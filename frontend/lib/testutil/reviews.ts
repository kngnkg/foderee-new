import { generateApiUserForTest } from '@/lib/testutil/users'
import { isApiReview, type ApiReview } from '@/types/api/review'

export const generateApiReviewForTest = (
  data: Partial<ApiReview> = {},
): ApiReview => {
  const apiReview = {
    review_id: 'a3bb189e-8bf9-3888-9912-ace4e6543002',
    published_status: 'published',
    album_id: 'testAlbumId',
    user: generateApiUserForTest(),
    title: 'Test Review',
    content: {
      time: 0,
      blocks: [
        {
          id: 'testBlockId',
          type: 'header',
          data: {
            text: 'Test Header',
            level: 1,
          },
        },
      ],
    },
    likes_count: 10,
    created_at: '2021-01-01T00:00:00Z',
    updated_at: '2021-01-01T00:00:00Z',
    ...data,
  }

  if (!isApiReview(apiReview)) {
    throw new Error(`Invalid API review data: ${apiReview}`)
  }
  return apiReview
}
