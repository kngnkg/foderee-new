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
          {...props}
        />
      )
    case 'notify':
      return (
        <BellIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'search':
      return (
        <MagnifyingGlassIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'new-post':
      return (
        <Pencil2Icon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'draft':
      return (
        <FileTextIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'like':
      return (
        <HeartIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'filled-like':
      return (
        <HeartFilledIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'comment':
      return (
        <ChatBubbleIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case 'add':
      return (
        <PlusCircledIcon
          onClick={onClick}
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    default:
      return null
  }
}
