import { cn } from '@/lib/utils'
import type { Album } from '@/types/album'
import { cva } from 'class-variance-authority'
import Image from 'next/image'

export type AlbumSize = 's' | 'm' | 'l'

interface AlbumArtProps {
  album: Pick<Album, 'name' | 'coverUrl'>
  size?: AlbumSize
  className?: string
}

export const AlbumArt: React.FC<AlbumArtProps> = ({
  album,
  size = 'm',
  className,
}) => {
  const albumVariants = cva('rounded-none', {
    variants: {
      size: {
        s: 'size-14',
        m: 'sm:size-34 size-28',
        l: 'size-34',
      },
    },
  })

  return (
    <Image
      src={album.coverUrl}
      height={300}
      width={300}
      alt={album.name}
      className={cn(albumVariants({ size }), className)}
    />
  )
}
