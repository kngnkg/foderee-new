'use client'

import type { Review } from '@/types/review'
import type { User } from '@/types/user'

import { Icon } from '@/components/icon'

interface LikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  review: Pick<Review, 'reviewId' | 'likesCount'>
  loginUser?: Pick<User, 'username' | 'immutableId'>
  className?: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({ review }) => {
  const isLiked = true

  return (
    <div className="flex items-center gap-0.5">
      {isLiked ? (
        <Icon type="filled-like" className="size-6" />
      ) : (
        <Icon type="like" className="size-6" />
      )}
      <span>{review.likesCount}</span>
    </div>
  )
}
