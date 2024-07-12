import { Icon } from '@/components/icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'
import { cva } from 'class-variance-authority'

export type AvatarSize = 's' | 'm' | 'l'

interface UserAvatarProps {
  user: Pick<User, 'username' | 'immutableId' | 'displayName' | 'avatarUrl'>
  size?: AvatarSize
  className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'm',
  className,
}) => {
  const avatarVariants = cva('', {
    variants: {
      size: {
        s: 'size-6',
        m: 'size-12',
        l: 'size-16 sm:size-28',
      },
    },
  })

  return (
    <Avatar className={cn(avatarVariants({ size }), className)}>
      {user.avatarUrl && (
        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
      )}
      <AvatarFallback>
        <Icon type="user" className={avatarVariants({ size })} />
      </AvatarFallback>
    </Avatar>
  )
}
