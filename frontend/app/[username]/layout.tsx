import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'
import { Separator } from '@/components/ui/separator'

interface UserLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

export default function UserLayout({ params, children }: UserLayoutProps) {
  const username = decodeURIComponent(params.username)

  const tabs: MenuTab[] = [
    { label: 'Reviews', value: 'reviews', href: `/${username}` },
    { label: 'Likes', value: 'likes', href: `/${username}/likes` },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex flex-col gap-6">
        {/* ユーザー情報 */}
        <div className="mt-6">
          <p>ユーザー情報</p>
        </div>
        {/* タブ */}
        <div>
          <MenuTabs tabs={tabs} />
          <Separator />
        </div>
        <div className="mx-auto sm:w-4/6">{children}</div>
      </main>
    </div>
  )
}
