import { UserSkeleton } from '@/components/users/user-skeleton'

interface UserListSkeletonProps {
  count: number
}

export const UserListSkeleton: React.FC<UserListSkeletonProps> = ({
  count,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <div key={idx}>
            <UserSkeleton />
          </div>
        ))}
    </div>
  )
}
