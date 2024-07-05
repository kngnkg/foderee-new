'use client'

import { EditorBlock } from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import type { Review } from '@/types/review'
import Link from 'next/link'

interface ReviewFormProps {
  initialReview?: Review
}

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-8">
        <Link href="/">キャンセル</Link>
        <div className="flex gap-8">
          <Button>下書きに保存</Button>
          <Button className="bg-primary dark:bg-primary">投稿する</Button>
        </div>
      </div>
      <div>
        <EditorBlock
          initialData={initialReview ? initialReview.content : undefined}
        />
      </div>
    </>
  )
}
