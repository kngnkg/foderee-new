'use client'

import { AlbumSelectDialog } from '@/components/editor/album-select-dialog'
import { EDITOR_TOOLS } from '@/components/editor/tools.mjs'
import { Button } from '@/components/ui/button'
import {
  Form,
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
  reviewTitleSchema,
  type Review,
} from '@/types/review'
import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ReviewFormProps {
  initialReview?: Review
}

const reviewFormSchema = z.object({
  title: reviewTitleSchema,
  // albumId: albumIdSchema,
  album: albumSimplifiedSchema,
  // content: reviewContentSchema,
  publishedStatus: publishedStatusSchema,
})

type ReviewForm = z.infer<typeof reviewFormSchema>

export const ReviewForm = ({ initialReview }: ReviewFormProps) => {
  const methods = useForm<ReviewForm>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: initialReview ? initialReview.title : '',
      // albumId: initialReview ? initialReview.album.albumId : '',
      album: initialReview ? initialReview.album : undefined,
      // content: initialReview ? initialReview.content : '',
      publishedStatus: initialReview
        ? initialReview.publishedStatus
        : PublishedStatus.Draft,
    },
  })

  const ref = React.useRef<EditorJS>()
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'レビューを記入してください',
        inlineToolbar: true,
        tools: EDITOR_TOOLS,
        data: initialReview ? initialReview.content : undefined,
      })
    }
  }, [initialReview])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const onSubmit = async (value: ReviewForm) => {
    console.log(ref.current?.save())
    if (initialReview) {
      console.log('update')
      console.log(value)
      return
    }
    console.log('create')
    console.log(value)
  }

  return (
    <Form {...methods}>
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
                onClick={() => {
                  methods.setValue('publishedStatus', PublishedStatus.Draft)
                }}
              >
                下書きに保存
              </Button>
              <Button
                type="submit"
                name="publish"
                className="bg-primary dark:bg-primary"
                onClick={() => {
                  methods.setValue('publishedStatus', PublishedStatus.Published)
                }}
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
          <div id="editor" />
        </form>
      </FormProvider>
    </Form>
  )
}
