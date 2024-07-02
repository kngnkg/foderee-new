'use client'

import type { User } from '@/types/user'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        {type === 'followers' ? (
          <p className="text-sm">{user.followersCount} フォロワー</p>
        ) : (
          <p className="text-sm">{user.followingCount} フォロー中</p>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-4/6 flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {type === 'followers' ? <>フォロワー</> : <>フォロー中</>}
          </DialogTitle>
        </DialogHeader>
        {/* ユーザー一覧 */}
        <ScrollArea className="h-4/6 w-full border-t border-zinc-700 p-6 pt-16 dark:border-zinc-700" />
      </DialogContent>
    </Dialog>
  )
}
