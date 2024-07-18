import { z } from 'zod'

export const spotifyTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('bearer'),
  expires_in: z.number(),
})

export type SpotifyToken = z.infer<typeof spotifyTokenSchema>
