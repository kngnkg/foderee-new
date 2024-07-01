import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'
import { Separator } from '@/components/ui/separator'
import { UserAvatar } from '@/components/user-avatar'

interface UserLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

export default function UserLayout({ params, children }: UserLayoutProps) {
  const username = decodeURIComponent(params.username)

  // TODO: ユーザー情報を取得する
  const user = {
    username,
    immutableId: '1',
    displayName: 'User Name',
    followersCount: 0,
    followingCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

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
          <UserAvatar user={user} size="xl" />
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
