import { SeeMoreButton } from '@/components/see-more-button'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('SeeMoreButton', () => {
  it('適切にレンダリングされる', async () => {
    render(<SeeMoreButton isLoading={false} loadMore={() => {}} />)
    const button = screen.getByRole('button', { name: /もっと見る/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button).toHaveAttribute('id', 'see-more-button')
  })

  it('ロード中にローダーが表示される', async () => {
    render(<SeeMoreButton isLoading={true} loadMore={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('id', 'see-more-button')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('クリック時にloadMoreを呼び出す', async () => {
    const loadMoreMock = jest.fn()
    render(<SeeMoreButton isLoading={false} loadMore={loadMoreMock} />)
    const button = screen.getByRole('button', { name: /もっと見る/i })
    fireEvent.click(button)
    expect(loadMoreMock).toHaveBeenCalledTimes(1)
  })

  it('ロード中はクリックしてもloadMoreを呼び出さない', async () => {
    const loadMoreMock = jest.fn()
    render(<SeeMoreButton isLoading={true} loadMore={loadMoreMock} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(loadMoreMock).not.toHaveBeenCalled()
  })
})
