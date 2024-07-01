import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'

interface LayoutProps {
  children: React.ReactNode
}
const tabs: MenuTab[] = [
  { label: 'Home', value: 'home', href: '/' },
  { label: 'Following', value: 'following', href: '/following' },
]

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <MenuTabs tabs={tabs} />
      </Header>
      <main className="container flex-1">
        <div className="mx-auto bg-background sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
