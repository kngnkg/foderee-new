import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'
import Link from 'next/link'

interface UserCardProps {
  user: Pick<User, 'username' | 'immutableId' | 'displayName' | 'avatarUrl'>
  cardSize?: 's' | 'm' | 'l'
  className?: string
  children?: React.ReactNode
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  cardSize = 'm',
  className,
  children,
}) => {
  const layout =
    cardSize === 'l'
      ? 'flex flex-col items-center gap-2 sm:flex-row sm:gap-4'
      : 'flex items-center gap-2 sm:gap-4'

  const pathToUser = `/${user.username}`

  return (
    <div className={cn(layout, className)}>
      <Link href={pathToUser}>
        <UserAvatar user={user} size={cardSize === 'l' ? 'xl' : 'm'} />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={pathToUser}>
          <h1 className="text-md font-bold sm:text-xl">{user.displayName}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
            {user.username}
          </p>
        </Link>
        {children}
      </div>
    </div>
  )
}
