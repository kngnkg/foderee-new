import { FollowButton } from '@/components/follow-button'
import { UserCard } from '@/components/user-card'
import { cn } from '@/lib/utils'
import type { PagedUsers } from '@/types/user'

interface UserListProps {
  pagedUsersList: PagedUsers[]
  className?: string
}

export const UserList: React.FC<UserListProps> = ({
  pagedUsersList,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {pagedUsersList.map((pagedUsers, idx) => {
        return (
          <ul key={idx} className="flex flex-col gap-4">
            {pagedUsers.users.map((user, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <UserCard user={user} cardSize="s" />
                <FollowButton user={user} />
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
