'use client'

import { AlbumSelectDialog } from '@/components/editor/album-select-dialog'
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
import { albumSimplifiedSchema } from '@/types/album'
import {
  PublishedStatus,
  publishedStatusSchema,
  reviewContentSchema,
  reviewTitleSchema,
  type Review,
} from '@/types/review'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ReviewFormProps {
  initialReview?: Review
}

const reviewFormSchema = z.object({
  title: reviewTitleSchema,
  album: albumSimplifiedSchema,
  content: reviewContentSchema,
  publishedStatus: publishedStatusSchema,
})

type ReviewForm = z.infer<typeof reviewFormSchema>

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  const methods = useForm<ReviewForm>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: initialReview ? initialReview.title : '',
      album: initialReview ? initialReview.album : undefined,
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
        <AlbumSelectDialog
          initialAlbum={initialReview ? initialReview.album : undefined}
        />
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
      </form>
    </FormProvider>
  )
}
