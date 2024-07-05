import { MenuTabs, type MenuTab } from '@/components/menu-tabs'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

const tabs: MenuTab[] = [
  { label: 'Tab 1', value: 'tab1', href: '/tab1' },
  { label: 'Tab 2', value: 'tab2', href: '/tab2' },
]

describe('MenuTabs', () => {
  it('適切にレンダリングされる', () => {
    render(<MenuTabs tabs={tabs} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
  })

  it('defaultValueが正しく設定される', () => {
    render(<MenuTabs tabs={tabs} defaultValue="tab1" />)
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
      'data-state',
      'active',
    )
  })

  it('各タブが正しいhref属性にラップされる', () => {
    render(<MenuTabs tabs={tabs} />)
    expect(screen.getByText('Tab 1').closest('a')).toHaveAttribute(
      'href',
      '/tab1',
    )
    expect(screen.getByText('Tab 2').closest('a')).toHaveAttribute(
      'href',
      '/tab2',
    )
  })
})
