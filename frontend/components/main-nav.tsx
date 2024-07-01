'use client'

import Link from 'next/link'

import { Icon } from '@/components/icon'
import { cn } from '@/lib/utils'

interface MainNavProps {
  className?: string
}

export const MainNav: React.FC<MainNavProps> = ({ className }) => {
  // TODO: 実際のログインユーザー名に置き換える
  const loginUserId = '/@username'

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Link href="/search">
        <Icon type="search" />
      </Link>
      <Icon type="notify" />
      <Link href={loginUserId}>
        <Icon type="user" className="size-8" />
      </Link>
      <Link href="/editor/new">
        <Icon
          type="new-post"
          className="size-8 text-primary dark:text-primary"
        />
      </Link>
    </div>
  )
}
