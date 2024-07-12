import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'
import { cva } from 'class-variance-authority'
import Link from 'next/link'

export type UserCardSize = 's' | 'm' | 'l'

export interface UserCardProps {
  user: Pick<User, 'username' | 'immutableId' | 'displayName' | 'avatarUrl'>
  cardSize?: UserCardSize
  className?: string
  children?: React.ReactNode
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  cardSize = 'm',
  className,
  children,
}) => {
  const layoutVariants = cva('flex items-center', {
    variants: {
      size: {
        s: 'gap-2',
        m: 'gap-2 sm:gap-4',
        l: 'flex-col gap-2 sm:flex-row sm:gap-4',
      },
    },
  })

  const displayNameVariants = cva('font-bold', {
    variants: {
      size: {
        s: 'sm:text-md text-sm',
        m: 'text-lg',
        l: 'text-md sm:text-xl',
      },
    },
  })

  const usernameVariants = cva('text-zinc-500 dark:text-zinc-400', {
    variants: {
      size: {
        s: 'text-sm',
        m: 'text-sm',
        l: 'text-sm sm:text-base',
      },
    },
  })

  const pathToUser = `/${user.username}`

  return (
    <div className={cn(layoutVariants({ size: cardSize }), className)}>
      <Link href={pathToUser}>
        <UserAvatar user={user} size={cardSize} />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={pathToUser}>
          <p className={displayNameVariants({ size: cardSize })}>
            {user.displayName}
          </p>
          {cardSize !== 's' && (
            <p className={usernameVariants({ size: cardSize })}>
              {user.username}
            </p>
          )}
        </Link>
        {children}
      </div>
    </div>
  )
}
