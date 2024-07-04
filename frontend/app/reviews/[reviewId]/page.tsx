import { getReview } from '@/service/reviews/get-review'
import { notFound } from 'next/navigation'

interface ReviewPageProps {
  params: { reviewId: string }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const reviewId = decodeURIComponent(params.reviewId)

  const review = await getReview(reviewId)
  if (!review) {
    return notFound()
  }
  console.log(review)

  return (
    <section>
      <h1>レビュー詳細ページ</h1>
    </section>
  )
}
