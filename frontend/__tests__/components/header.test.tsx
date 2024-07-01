import { Header } from '@/components/header'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />)

    const header = screen.getByRole('banner')

    expect(header).toBeInTheDocument()
  })
})
