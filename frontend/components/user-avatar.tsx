import { Icon } from '@/components/icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

interface UserAvatarProps {
  user: Pick<User, 'username' | 'immutableId' | 'displayName' | 'avatarUrl'>
  size?: 's' | 'm' | 'l' | 'xl'
  className?: string
}

interface AvatarSize {
  size: string
  className: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'm',
  className,
}) => {
  const avatarSizes: AvatarSize[] = [
    { size: 's', className: 'size-4' },
    { size: 'm', className: 'size-6' },
    { size: 'l', className: 'size-12' },
    { size: 'xl', className: 'size-16 sm:size-28' },
  ]

  const avatarSize = avatarSizes.find((s) => s.size === size)!.className

  return (
    <Avatar className={cn(avatarSize, className)}>
      {user.avatarUrl ? (
        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
      ) : (
        <AvatarFallback>
          <Icon type="user" className={avatarSize} />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
