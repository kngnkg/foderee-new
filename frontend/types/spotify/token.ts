import { z } from 'zod'

export const spotifyTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
})

export type SpotifyToken = z.infer<typeof spotifyTokenSchema>
