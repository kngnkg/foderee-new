'use client'

import { EditorBlock } from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { albumIdSchema } from '@/types/album'
import {
  PublishedStatus,
  publishedStatusSchema,
  reviewContentSchema,
  reviewTitleSchema,
  type Review,
} from '@/types/review'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ReviewFormProps {
  initialReview?: Review
}

const reviewFormSchema = z.object({
  title: reviewTitleSchema,
  albumId: albumIdSchema,
  content: reviewContentSchema,
  publishedStatus: publishedStatusSchema,
})

type ReviewForm = z.infer<typeof reviewFormSchema>

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  const methods = useForm<ReviewForm>({
    // schema: reviewFormSchema,
    defaultValues: {
      title: initialReview ? initialReview.title : '',
      albumId: initialReview ? initialReview.album.albumId : '',
      content: initialReview ? initialReview.content : '',
      publishedStatus: initialReview
        ? initialReview.publishedStatus
        : PublishedStatus.Draft,
    },
  })

  const onSubmit = (value: ReviewForm) => {
    if (initialReview) {
      console.log('update')
      console.log(value)
      return
    }
    console.log('create')
    console.log(value)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* 各種ボタン */}
        <div className="flex items-center justify-between gap-8">
          <Link href="/">キャンセル</Link>
          <div className="flex gap-8">
            <Button
              type="submit"
              name="draft"
              onClick={() =>
                methods.setValue('publishedStatus', PublishedStatus.Draft)
              }
            >
              下書きに保存
            </Button>
            <Button
              type="submit"
              name="publish"
              className="bg-primary dark:bg-primary"
              onClick={() =>
                methods.setValue('publishedStatus', PublishedStatus.Published)
              }
            >
              投稿する
            </Button>
          </div>
        </div>
        {/* アルバム */}
        <div>
          {/* <AlbumSelectDialog album={album} setAlbum={setAlbum} /> */}
          {/* <AlbumSelectDialog /> */}
          {/* アルバム名とアーティスト名を表示 */}
          {/* {album && (
            <>
              <div className="text-sm sm:text-base">{album.name}</div>
              <div className="text-xs sm:text-sm">
                {album.artists.map((artist, idx) => (
                  <span key={idx}>
                    {artist.name}
                    {idx !== album.artists.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </>
          )} */}
        </div>
        <div>
          {/* レビュータイトル */}
          <FormField
            control={methods.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="タイトル" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* エディタ */}
          <EditorBlock
            initialData={initialReview ? initialReview.content : undefined}
          />
        </div>
      </form>
    </FormProvider>
  )
}
