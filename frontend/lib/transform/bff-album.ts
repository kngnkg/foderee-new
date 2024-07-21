import type { AlbumSimplified } from '@/types/album'
import type { BffAlbumObjectSimplified } from '@/types/bff/album'

export const transformAlbumSimplified = (
  data: BffAlbumObjectSimplified,
): AlbumSimplified => {
  return {
    ...data,
    releaseDate: new Date(data.releaseDate),
  }
}

export const transformBffAlbumSimplified = (
  data: AlbumSimplified,
): BffAlbumObjectSimplified => {
  return {
    ...data,
    releaseDate: data.releaseDate.toISOString(),
  }
}
