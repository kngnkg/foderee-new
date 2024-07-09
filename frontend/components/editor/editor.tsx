'use client'

import { EDITOR_TOOLS } from '@/components/editor/tools.mjs'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import * as React from 'react'

interface EditorBlockProps {
  initialData?: OutputData
}

export const EditorBlock = ({ initialData }: EditorBlockProps) => {
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
        data: initialData,
        // async onChange(api, event) {
        //   const data = await api.saver.save()
        //   setValue('content', data)
        // },
      })
    }
  }, [initialData])

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

  return <div id="editor" />
}
