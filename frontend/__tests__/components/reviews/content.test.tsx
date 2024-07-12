import { Content } from '@/components/reviews/content'
import { isContentParagraph, type ContentBlock } from '@/types/review'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import DOMPurify from 'isomorphic-dompurify'

jest.mock('isomorphic-dompurify', () => ({
  sanitize: jest.fn((html) => html),
}))

jest.mock('editorjs-html', () => () => ({
  parse: jest.fn((data) =>
    data.blocks.map((block: ContentBlock) => {
      if (isContentParagraph(block.data)) {
        return `<div><p>${block.data.text}</p></div>`
      }
      return '<div />'
    }),
  ),
}))

describe('Content', () => {
  it('サニタイズされたHTMLがレンダリングされる', () => {
    const mockData = {
      time: 1629897600000,
      blocks: [
        {
          id: 'gj0zisoWaG',
          type: 'paragraph',
          data: { text: 'Test content' },
        },
      ],
    }

    const { container } = render(<Content data={mockData} />)
    expect(container.querySelector('div.prose')).toBeInTheDocument()
    expect(container.querySelector('div.prose')?.innerHTML).toContain(
      'Test content',
    )

    // DOMPurify.sanitizeが呼び出されたことを確認
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      '<div><p>Test content</p></div>',
    )
  })

  it('複数のブロックが正しくレンダリングされる', () => {
    const mockData = {
      time: 1629897600000,
      blocks: [
        {
          id: 'gj0zisoWaG',
          type: 'paragraph',
          data: { text: 'First block' },
        },
        {
          id: 'gj0zisoWaG',
          type: 'paragraph',
          data: { text: 'Second block' },
        },
      ],
    }

    const { container } = render(<Content data={mockData} />)
    expect(container.querySelector('div.prose')).toBeInTheDocument()
    expect(container.querySelector('div.prose')?.innerHTML).toContain(
      'First block',
    )
    expect(container.querySelector('div.prose')?.innerHTML).toContain(
      'Second block',
    )

    // DOMPurify.sanitizeがそれぞれのブロックに対して呼び出されたことを確認
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      '<div><p>First block</p></div>',
    )
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      '<div><p>Second block</p></div>',
    )
  })
})
