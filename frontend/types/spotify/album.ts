import { albumIdSchema } from '@/types/album'
import { z } from 'zod'

export const spotifyArtistObjectSimplifiedSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type SpotifyArtistObjectSimplified = z.infer<
  typeof spotifyArtistObjectSimplifiedSchema
>

export const spotifyAlbumObjectSimplifiedSchema = z.object({
  id: albumIdSchema,
  uri: z.string(),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  artists: z.array(spotifyArtistObjectSimplifiedSchema),
  images: z.array(z.object({ url: z.string().url() })),
  name: z.string(),
  release_date: z.string(),
  total_tracks: z.number().min(0),
})

export type SpotifyAlbumObjectSimplified = z.infer<
  typeof spotifyAlbumObjectSimplifiedSchema
>

export const spotifyTrackObjectSimplified = z.object({
  id: z.string(),
  name: z.string(),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  uri: z.string(),
  duration_ms: z.number(),
  track_number: z.number(),
})

export type SpotifyTrackObjectSimplified = z.infer<
  typeof spotifyTrackObjectSimplified
>

export const spotifySingleAlbumResponseSchema =
  spotifyAlbumObjectSimplifiedSchema.extend({
    tracks: z.object({
      items: z.array(spotifyTrackObjectSimplified),
      limit: z.number(),
      next: z.string().nullish(),
      offset: z.number(),
      previous: z.string().nullish(),
      total: z.number(),
    }),
  })

export type SpotifySingleAlbumResponse = z.infer<
  typeof spotifySingleAlbumResponseSchema
>

export const spotifyAlbumSearchResponseSchema = z.object({
  albums: z.object({
    items: z.array(spotifyAlbumObjectSimplifiedSchema),
    limit: z.number(),
    next: z.string().nullish(),
    offset: z.number(),
    previous: z.string().nullish(),
    total: z.number(),
  }),
})

export type SpotifyAlbumSearchResponse = z.infer<
  typeof spotifyAlbumSearchResponseSchema
>
