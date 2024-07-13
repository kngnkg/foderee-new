// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformUser = (data: any) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformAlbumSimplified = (data: any) => {
  return {
    albumId: data.albumId,
    name: data.name,
    artists: data.artists,
    coverUrl: data.coverUrl,
    releaseDate: new Date(data.releaseDate),
  }
}
