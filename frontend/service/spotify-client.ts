import SpotifyWebApi from 'spotify-web-api-node'

import { env } from '@/env.mjs'

export const spotifyClient = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
})

async function clientCredentialsGrant(
  spotifyClient: SpotifyWebApi,
): Promise<string | null> {
  try {
    // アクセストークンを取得する
    const data = await spotifyClient.clientCredentialsGrant()
    const token = data.body['access_token']

    return token
  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch token')
  }
}

export async function setSpotifyClientAccessToken(
  spotifyClient: SpotifyWebApi,
): Promise<void> {
  const token = await clientCredentialsGrant(spotifyClient)
  if (!token) {
    throw new Error('Failed to fetch token')
  }

  spotifyClient.setAccessToken(token)
}
