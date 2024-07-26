import { Skeleton } from '@/components/ui/skeleton'

interface AlbumListSkeletonProps {
  count: number
}

export const AlbumListSkeleton: React.FC<AlbumListSkeletonProps> = ({
  count,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <Skeleton className="size-14" />
            <Skeleton className="h-6 w-48" />
          </div>
        ))}
    </div>
  )
}
