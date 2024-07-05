import { paginationSchema } from '@/types/pagination'
import { z } from 'zod'

export const artistSchema = z.object({
  artistId: z.string(),
  spotifyUri: z.string(),
  spotifyUrl: z.string().url(),
  name: z.string(),
  imageUrl: z.string().url(),
})

export const artistInfoSchema = artistSchema.pick({
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
  artists: z.array(artistInfoSchema),
  tracks: z.array(trackSchema),
  coverUrl: z.string().url(),
  releaseDate: z.date(),
})

export const albumsWithPaginationSchema = paginationSchema.extend({
  albums: z.array(albumSchema),
})

export type Artist = z.infer<typeof artistSchema>
export type ArtistInfo = z.infer<typeof artistInfoSchema>
export type Track = z.infer<typeof trackSchema>
export type Album = z.infer<typeof albumSchema>
export type AlbumsWithPagination = z.infer<typeof albumsWithPaginationSchema>
