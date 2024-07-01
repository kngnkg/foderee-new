import { UserAvatar } from '@/components/user-avatar'
import type { User } from '@/types'

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

  return (
    <div className={className}>
      <div className={layout}>
        <UserAvatar user={user} size={cardSize === 'l' ? 'xl' : 'm'} />
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-bold sm:text-xl">{user.displayName}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
            {user.username}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
