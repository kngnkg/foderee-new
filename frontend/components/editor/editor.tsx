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

  // editorjsを初期化する
  React.useEffect(() => {
    if (ref.current) return

    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'レビューを記入してください',
      tools: EDITOR_TOOLS,
    })

    // 複数回初期化しないようにrefに保存
    ref.current = editor
  })

  return <div id="editor" />
}
