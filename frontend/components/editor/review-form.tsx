'use client'

import { AlbumSelectDialog } from '@/components/editor/album-select-dialog'
import { EditorBlock } from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import type { AlbumSimplified } from '@/types/album'
import type { Review } from '@/types/review'
import Link from 'next/link'
import * as React from 'react'

interface ReviewFormProps {
  initialReview?: Review
}

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  const [album, setAlbum] = React.useState<AlbumSimplified | null>(
    initialReview ? initialReview.album : null,
  )

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
        <AlbumSelectDialog album={album} setAlbum={setAlbum} />
      </div>
      <div>
        <EditorBlock
          initialData={initialReview ? initialReview.content : undefined}
        />
      </div>
    </>
  )
}
