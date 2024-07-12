import { AlbumArt } from '@/components/album-art'
import { FollowButton } from '@/components/follow-button'
import { Content } from '@/components/reviews/content'
import { TimeStamp } from '@/components/timestamp'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'
import type { Review } from '@/types/review'

interface ReviewContentProps {
  review: Review
}
export const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
  return (
    <article className="flex flex-col items-center gap-4 sm:items-start">
      {/* アルバム情報 */}
      <section className="mt-8">
        <AlbumArt album={review.album} size="l" />
      </section>
      <div className="flex flex-col gap-4">
        {/* タイトル */}
        <section className="my-2">
          <h1 className="text-3xl font-extrabold md:text-5xl">
            {review.title}
          </h1>
        </section>
        {/* 投稿ユーザーの情報 */}
        <Separator />
        <section className="flex items-center justify-between gap-2">
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
        <Separator />
        {/* 本文 */}
        <section>
          <Content data={review.content} />
        </section>
      </div>
    </article>
  )
}
