'use client'

import { EditorBlock } from '@/components/editor/editor'
import type { Review } from '@/types/review'
import { undefined } from 'zod'

interface ReviewFormProps {
  initialReview?: Review
}

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  return (
    <div>
      <EditorBlock
        initialData={initialReview ? initialReview.content : undefined}
      />
    </div>
  )
}
