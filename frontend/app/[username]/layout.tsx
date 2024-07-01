import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'

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
    { label: 'レビュー', value: 'reviews', href: `/${username}` },
    { label: 'いいね', value: 'likes', href: `/${username}/likes` },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex flex-col gap-6">
        {/* ユーザー情報 */}
        <div className="mx-auto mt-6 flex items-center justify-between sm:w-4/6">
          <UserCard user={user} cardSize="l" className="mt-2">
            <div className="flex gap-4">
              <p>フォロー</p>
              <p>フォロワー</p>
            </div>
          </UserCard>
          <Button className="ml-3">フォロー</Button>
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
