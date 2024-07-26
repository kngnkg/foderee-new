'use client'

import * as React from 'react'

import { AlbumArt } from '@/components/album-art'
import { AlbumArtistsNames } from '@/components/album-artists-names'
import { cn } from '@/lib/utils'
import { type PagedAlbums } from '@/types/album'
import { useFormContext } from 'react-hook-form'

interface AlbumListProps {
  pagedAlbumsList: PagedAlbums[]
  onClick: () => void
  className?: string
}

export const AlbumList: React.FC<AlbumListProps> = ({
  pagedAlbumsList,
  onClick,
  className,
}) => {
  const { setValue } = useFormContext()

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {pagedAlbumsList.map((pagedAlbums, idx) => {
        return (
          <ul key={idx} className="flex flex-col gap-4">
            {pagedAlbums.albums.map((album, idx) => (
              <li
                key={idx}
                className="flex cursor-pointer items-center gap-4"
                onClick={() => {
                  setValue('album', album)
                  onClick()
                }}
              >
                <AlbumArt album={album} size="s" />
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-sm sm:text-base">{album.name}</div>
                  <AlbumArtistsNames album={album} />
                </div>
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
