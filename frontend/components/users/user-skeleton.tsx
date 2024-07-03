import { Skeleton } from '@/components/ui/skeleton'

export const UserSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-9 w-24 rounded-md px-3" />
    </div>
  )
}
