import { isAlbumSimplified, type AlbumSimplified } from '@/types/album'
import type { User } from '@/types/user'
import { isUser } from '@/types/user'

export const transformUser = (data: unknown): User => {
  if (!isUser(data)) {
    throw new Error('User is invalid')
  }

  return {
    username: data.username,
    immutableId: data.immutableId,
    displayName: data.displayName,
    avatarUrl: data.avatarUrl,
    bio: data.bio,
    followersCount: data.followersCount,
    followingCount: data.followingCount,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

export const transformAlbumSimplified = (data: unknown): AlbumSimplified => {
  if (!isAlbumSimplified(data)) {
    throw new Error('AlbumSimplified is invalid')
  }

  return {
    albumId: data.albumId,
    name: data.name,
    artists: data.artists,
    coverUrl: data.coverUrl,
    releaseDate: new Date(data.releaseDate),
  }
}
