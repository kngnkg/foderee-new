'use client'
import type { User } from '@/types/user'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { SeeMoreButton } from '@/components/see-more-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserList } from '@/components/users/user-list'
import { UserListSkeleton } from '@/components/users/user-list-skeleton'
import { env } from '@/env.mjs'
import { useUsers } from '@/hooks/users/use-users'

interface UserListDialogProps {
  type: 'followers' | 'followees'
  user: Pick<
    User,
    | 'username'
    | 'immutableId'
    | 'displayName'
    | 'avatarUrl'
    | 'followersCount'
    | 'followingCount'
  >
}

export const UserListDialog: React.FC<UserListDialogProps> = ({
  type,
  user,
}) => {
  const {
    pagedUsersList,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useUsers({
    endpoint: `${env.NEXT_PUBLIC_API_URL}/users/${user.username}/${type}`,
  })

  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        <p className="text-sm">
          {type === 'followers'
            ? `${user.followersCount} フォロワー`
            : `${user.followingCount} フォロー中`}
        </p>
      </DialogTrigger>
      <DialogContent className="flex h-4/6 flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {type === 'followers' ? <>フォロワー</> : <>フォロー中</>}
          </DialogTitle>
          {/* Descriptionは不要だが警告が出るのでVisuallyHiddenで隠す */}
          <VisuallyHidden.Root>
            <DialogDescription>description</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        {/* ユーザー一覧 */}
        <ScrollArea className="size-full border-t border-zinc-700 p-6 pt-0 dark:border-zinc-700">
          {error ? (
            <p className="mt-6">Something went wrong.</p>
          ) : (
            <>
              {pagedUsersList ? (
                <>
                  <UserList pagedUsersList={pagedUsersList} className="pt-4" />
                  <div className="flex flex-col items-center">
                    {!isReachingEnd && (
                      <SeeMoreButton
                        isLoading={
                          isLoading ||
                          (isLoadingMore !== undefined && isLoadingMore)
                        }
                        loadMore={loadMore}
                      />
                    )}
                  </div>
                </>
              ) : (
                <UserListSkeleton count={10} />
              )}
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
