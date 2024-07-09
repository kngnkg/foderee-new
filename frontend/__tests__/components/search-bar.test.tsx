import { SearchBar } from '@/components/search-bar'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('SearchBar', () => {
  it('適切にレンダリングされる', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('valueが変更されるとonChangeが呼び出される', () => {
    const handleChange = jest.fn()
    render(<SearchBar value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('Enterキーが押され、入力値が空でない場合にonEnterKeyDownが呼び出される', () => {
    const handleEnterKeyDown = jest.fn()
    render(
      <SearchBar
        value="test"
        onChange={() => {}}
        onEnterKeyDown={handleEnterKeyDown}
      />,
    )
    const input = screen.getByRole('textbox')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(handleEnterKeyDown).toHaveBeenCalledTimes(1)
  })

  it('Enterキーが押され、入力値が空の場合にonEnterKeyDownが呼び出されない', () => {
    const handleEnterKeyDown = jest.fn()
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onEnterKeyDown={handleEnterKeyDown}
      />,
    )
    const input = screen.getByRole('textbox')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(handleEnterKeyDown).not.toHaveBeenCalled()
  })

  it('Enterキー以外のキーが押されたとき、onEnterKeyDownが呼び出されない', () => {
    const handleEnterKeyDown = jest.fn()
    render(
      <SearchBar
        value="test"
        onChange={() => {}}
        onEnterKeyDown={handleEnterKeyDown}
      />,
    )
    const input = screen.getByRole('textbox')

    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', charCode: 65 })
    expect(handleEnterKeyDown).not.toHaveBeenCalled()
  })
})
