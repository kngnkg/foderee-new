import { Icon } from '@/components/icon'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Icon', () => {
  // 各アイコンタイプに対して正しいアイコンがレンダリングされることを確認する
  it('アイコンタイプ "user" が正しくレンダリングされる', () => {
    render(<Icon type="user" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "notify" が正しくレンダリングされる', () => {
    render(<Icon type="notify" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "search" が正しくレンダリングされる', () => {
    render(<Icon type="search" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "new-post" が正しくレンダリングされる', () => {
    render(<Icon type="new-post" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "draft" が正しくレンダリングされる', () => {
    render(<Icon type="draft" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "like" が正しくレンダリングされる', () => {
    render(<Icon type="like" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "filled-like" が正しくレンダリングされる', () => {
    render(<Icon type="filled-like" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "comment" が正しくレンダリングされる', () => {
    render(<Icon type="comment" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('アイコンタイプ "add" が正しくレンダリングされる', () => {
    render(<Icon type="add" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('classNameが正しく適用される', () => {
    const className = 'custom-class'
    render(<Icon type="search" className={className} />)
    const icon = screen.getByRole('img')
    expect(icon).toHaveClass('custom-class')
  })

  it('クリックされたときにonClickが呼び出される', () => {
    const handleClick = jest.fn()
    render(<Icon type="search" onClick={handleClick} />)
    const icon = screen.getByRole('img')
    fireEvent.click(icon)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
