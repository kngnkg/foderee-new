import type { Content as ContentType } from '@/types/review'
import DOMPurify from 'isomorphic-dompurify'

// editorjs-html は型定義がないので、requireで読み込む
// eslint-disable-next-line @typescript-eslint/no-var-requires
const editorJsHtml = require('editorjs-html')
const EditorJsToHtml = editorJsHtml()

type Props = {
  data: ContentType
}
type ParsedContent = string | JSX.Element

export const Content = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[]
  return (
    // dataごとにDOMを再レンダリングするために一意のkeyを設定
    <div className="prose prose-invert" key={data.time}>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
              key={index}
            ></div>
          )
        }
        return item
      })}
    </div>
  )
}
