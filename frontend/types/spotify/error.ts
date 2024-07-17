import { z } from 'zod'

export const spotifyErrorSchema = z.object({
  error: z.object({
    status: z.number(),
    message: z.string(),
  }),
})

export type SpotifyError = z.infer<typeof spotifyErrorSchema>

export function isSpotifyError(obj: unknown): obj is SpotifyError {
  return spotifyErrorSchema.safeParse(obj).success
}

export const spotifyResponseErrorSchema = z.object({
  body: spotifyErrorSchema,
  headers: z.any(),
  statusCode: z.number(),
})

export type SpotifyResponseError = z.infer<typeof spotifyResponseErrorSchema>

export function isSpotifyResponseError(
  obj: unknown,
): obj is SpotifyResponseError {
  return spotifyResponseErrorSchema.safeParse(obj).success
}
