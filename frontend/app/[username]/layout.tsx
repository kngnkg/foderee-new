import { Header } from '@/components/header'
import type { MenuTab } from '@/components/menu-tabs'
import { MenuTabs } from '@/components/menu-tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'
import { isApiUser, toUser } from '@/types/api/user'
import type { User } from '@/types/user'
import { notFound } from 'next/navigation'
import { env } from 'process'

interface UserLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

const getUser = async (username: string): Promise<User | null> => {
  try {
    const resp = await fetch(
      `${env.API_URL}/users/${username}`,
      // `${env.API_URL}/users/${encodeURIComponent(username)}`,
      {
        cache: 'no-store',
      },
    )

    if (!resp) {
      return null
    }
    if (resp.status !== 200) {
      return null
    }

    const data = await resp.json()
    if (!isApiUser(data)) {
      console.error('Invalid user data:', data)
      return null
    }

    return toUser(data)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function UserLayout({
  params,
  children,
}: UserLayoutProps) {
  const username = decodeURIComponent(params.username)

  const user = await getUser(username)
  if (!user) {
    return notFound()
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
