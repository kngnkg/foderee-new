'use client'

import type { User } from '@/types/user'
import { Suspense } from 'react'

import { FollowButton } from '@/components/follow-button'
import { useUsers } from '@/hooks/users/use-users'

import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/user-card'
import { UserListSkeleton } from '@/components/users/user-list-skeleton'
import { UserSkeleton } from '@/components/users/user-skeleton'

interface UserListProps {
  endpoint: string
}

export const UserList: React.FC<UserListProps> = ({ endpoint }) => {
  const { data, error, isLoading, loadMore } = useUsers({
    endpoint,
  })

  if (error) {
    console.error(error)
    return <p>Something went wrong.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        <>
          {data.map((userWP, idx) => (
            <>
              {userWP.users.map((user: User) => (
                <div key={idx} className="flex items-center justify-between">
                  <Suspense fallback={<UserSkeleton />}>
                    <UserCard user={user} cardSize="s" />
                    <FollowButton user={user} />
                  </Suspense>
                </div>
              ))}
            </>
          ))}
        </>
      ) : (
        <>{isLoading ? <UserListSkeleton count={10} /> : <p>No Content.</p>}</>
      )}
      <div className="mb-20 flex flex-col items-center">
        <Button variant="ghost" size="lg" onClick={() => loadMore()}>
          もっと見る
        </Button>
      </div>
    </div>
  )
}
