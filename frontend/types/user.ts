export type Username = string

export type ImmutableId = string

export type User = {
  username: Username
  immutableId: ImmutableId
  displayName: string
  avatarUrl?: string
  bio?: string
  followersCount: number
  followingCount: number
  createdAt: Date
  updatedAt: Date
}
