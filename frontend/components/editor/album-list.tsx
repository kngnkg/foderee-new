'use client'

import * as React from 'react'

import { AlbumArt } from '@/components/album-art'
import { Skeleton } from '@/components/ui/skeleton'
import type { AlbumSimplified, AlbumsWithPagination } from '@/types/album'

interface AlbumListProps {
  setAlbum: (album: AlbumSimplified) => void
  data: AlbumsWithPagination[] | undefined
  isLoading: boolean
}

export const AlbumList: React.FC<AlbumListProps> = ({
  data,
  isLoading,
  setAlbum,
}) => {
  if (!data) {
    return (
      <>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Skeleton className="size-14" />
                  <Skeleton className="h-6 w-48" />
                </div>
              ))}
          </div>
        ) : (
          <p>no data.</p>
        )}
      </>
    )
  }

  // TODO: suspense
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {data.map((albumWithPagination, idx) => {
          return (
            <ul key={idx} className="flex flex-col gap-4">
              {albumWithPagination.albums.map((album, idx) => (
                <li
                  key={idx}
                  className="flex cursor-pointer items-center gap-4"
                  onClick={() => setAlbum(album)}
                >
                  <AlbumArt album={album} className="size-14 sm:size-14" />
                  <div className="flex flex-col gap-1">
                    <div className="text-sm sm:text-base">{album.name}</div>
                    <div className="text-xs sm:text-sm">
                      {album.artists[0].name}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        })}
      </div>
    </div>
  )
}
