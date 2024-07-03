'use client'

import type { User } from '@/types/user'
import * as React from 'react'

import { Button } from '@/components/ui/button'

interface FollowButtonProps {
  user: Pick<User, 'username' | 'immutableId'>
  variant?: 'default' | 'link'
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  variant = 'default',
}) => {
  return (
    <>
      <Button
        variant={variant}
        size="sm"
        className={
          variant === 'link'
            ? 'text-zinc-300 dark:text-zinc-300'
            : 'border bg-background text-zinc-200 dark:border-zinc-700 dark:bg-background dark:text-zinc-200'
        }
      >
        フォロー中
      </Button>
    </>
  )
}
