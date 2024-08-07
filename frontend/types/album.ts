import { paginationSchema } from '@/types/pagination'
import { z } from 'zod'

export const artistSchema = z.object({
  artistId: z.string(),
  spotifyUri: z.string(),
  spotifyUrl: z.string().url(),
  name: z.string(),
  imageUrl: z.string().url(),
})

export const artistSimplifiedSchema = artistSchema.pick({
  artistId: true,
  name: true,
})

export const trackSchema = z.object({
  trackId: z.string(),
  spotifyUri: z.string(),
  spotifyUrl: z.string().url(),
  title: z.string(),
  durationMs: z.number(),
  trackNumber: z.number(),
})

export const albumSchema = z.object({
  albumId: z.string(),
  spotifyUri: z.string(),
  spotifyUrl: z.string().url(),
  name: z.string(),
  artists: z.array(artistSimplifiedSchema),
  tracks: z.array(trackSchema),
  coverUrl: z.string().url(),
  releaseDate: z.date(),
})

export const albumIdSchema = albumSchema.shape.albumId

export const albumSimplifiedSchema = albumSchema.pick({
  albumId: true,
  name: true,
  artists: true,
  coverUrl: true,
  releaseDate: true,
})

export const pagedAlbums = paginationSchema.extend({
  albums: z.array(albumSimplifiedSchema),
})

export type Artist = z.infer<typeof artistSchema>
export type ArtistSimplified = z.infer<typeof artistSimplifiedSchema>
export type Track = z.infer<typeof trackSchema>
export type Album = z.infer<typeof albumSchema>
export type AlbumSimplified = z.infer<typeof albumSimplifiedSchema>
export type PagedAlbums = z.infer<typeof pagedAlbums>
