import { env } from '@/env.mjs'
import {
  setSpotifyClientAccessToken,
  spotifyClient,
  toAlbum,
} from '@/service/spotify-client'
import type { Album } from '@/types/album'

export default async function getAlbum(albumId: string): Promise<Album> {
  try {
    await setSpotifyClientAccessToken(spotifyClient)

    // const resp = await spotifyClient.getAlbum(albumId)
    // const data = resp.body

    const resp = await fetch(`${env.MOCK_API_URL}/albums/${albumId}`, {})
    const data: SpotifyApi.SingleAlbumResponse = await resp.json()

    if (!data) {
      throw new Error('Failed to fetch album')
    }

    return toAlbum(data)
  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch album')
  }
}
