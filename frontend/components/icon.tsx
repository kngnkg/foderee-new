import {
  AvatarIcon,
  BellIcon,
  ChatBubbleIcon,
  FileTextIcon,
  HeartFilledIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface IconProps {
  type:
    | 'user'
    | 'notify'
    | 'search'
    | 'new-post'
    | 'draft'
    | 'like'
    | 'filled-like'
    | 'comment'
    | 'add'
    | 'loader'
  className?: string
  onClick?: () => void
}

export const Icon: React.FC<IconProps> = ({
  type,
  className,
  onClick,
  ...props
}) => {
  const baseClassName =
    'cursor-pointer w-6 h-6 text-zinc-500 dark:text-zinc-500'

  switch (type) {
    case 'user':
      return (
        <AvatarIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'notify':
      return (
        <BellIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'search':
      return (
        <MagnifyingGlassIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'new-post':
      return (
        <Pencil2Icon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'draft':
      return (
        <FileTextIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'like':
      return (
        <HeartIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'filled-like':
      return (
        <HeartFilledIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'comment':
      return (
        <ChatBubbleIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'add':
      return (
        <PlusCircledIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          role="img"
          {...props}
        />
      )
    case 'loader':
      return (
        <Loader2 className={cn(`${baseClassName} animate-spin`, className)} />
      )
    default:
      return null
  }
}
