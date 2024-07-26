import { cn } from '@/lib/utils'
import type { AlbumSimplified } from '@/types/album'

interface AlbumArtistsNamesProps {
  album: Pick<AlbumSimplified, 'artists'>
  className?: string
}

export const AlbumArtistsNames: React.FC<AlbumArtistsNamesProps> = ({
  album,
  className,
}) => {
  return (
    <div className={cn('text-xs sm:text-sm', className)}>
      {album.artists.map((artist) => artist.name).join(', ')}
    </div>
  )
}
