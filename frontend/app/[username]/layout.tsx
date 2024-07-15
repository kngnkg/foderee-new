import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'
import { UserListDialog } from '@/components/users/user-list-dialog'
import { getUser } from '@/service/users/get-user'
import { EntityNotFoundError } from '@/types/error'
import { notFound } from 'next/navigation'

interface UserLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

export default async function UserLayout({
  params,
  children,
}: UserLayoutProps) {
  try {
    const username = decodeURIComponent(params.username)
    const user = await getUser(username)

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
                <UserListDialog type="followers" user={user} />
                <UserListDialog type="followees" user={user} />
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
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      return notFound()
    }

    throw e
  }
}
