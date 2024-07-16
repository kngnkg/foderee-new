import type { AlbumSimplified } from '@/types/album'
import { isAlbumSimplified } from '@/types/album'

export const transformAlbumSimplified = (data: unknown): AlbumSimplified => {
  if (!isAlbumSimplified(data)) {
    throw new Error('AlbumSimplified is invalid')
  }

  return {
    ...data,
    releaseDate: new Date(data.releaseDate),
  }
}
