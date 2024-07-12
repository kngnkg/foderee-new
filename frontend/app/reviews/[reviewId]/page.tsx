import { FollowButton } from '@/components/follow-button'
import { LikeButton } from '@/components/reviews/like-button'
import { ReviewContent } from '@/components/reviews/review-content'
import { TimeStamp } from '@/components/timestamp'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'
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

  return (
    <div className="flex justify-center">
      <div className="mb-16 flex flex-col gap-8 sm:w-7/12">
        <ReviewContent review={review} />
        <Separator />
        {/* 投稿ユーザーの情報 */}
        <section className="flex items-center gap-2">
          <div className="flex flex-col">
            <UserCard user={review.user}>
              <TimeStamp
                className="text-zinc-400 dark:text-zinc-400"
                date={review.createdAt}
              />
            </UserCard>
          </div>
          <div className="ml-4">
            <FollowButton user={review.user} />
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 flex w-full flex-col pr-0 pt-16 md:sticky md:top-0 md:h-screen md:w-3/12 md:pl-8">
        <div className="z-10 flex h-16 items-center justify-center border-t border-zinc-700 bg-background dark:border-zinc-700 md:h-20 md:rounded-md md:border">
          <LikeButton review={review} />
        </div>
      </div>
    </div>
  )
}
