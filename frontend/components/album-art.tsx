import type { Album } from '@/types/album'
import Image from 'next/image'

import { cn } from '@/lib/utils'

interface AlbumArtProps {
  album: Pick<Album, 'name' | 'coverUrl'>
  className?: string
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ album, className }) => {
  return (
    <Image
      src={album.coverUrl}
      height={300}
      width={300}
      alt={album.name}
      className={cn('rounded-none w-24 h-24 sm:w-48 sm:h-48', className)}
    />
  )
}
