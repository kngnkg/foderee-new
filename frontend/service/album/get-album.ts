import {
  setSpotifyClientAccessToken,
  spotifyClient,
} from '@/service/spotify-client'

export default async function getAlbum(
  albumId: string,
): Promise<SpotifyApi.SingleAlbumResponse> {
  try {
    await setSpotifyClientAccessToken(spotifyClient)

    const resp = await spotifyClient.getAlbum(albumId)
    const data = resp.body

    // const resp = await fetch(`${env.MOCK_API_URL}/albums/${albumId}`, {})
    // const data = await resp.json()

    if (!data) {
      throw new Error('Failed to fetch album')
    }

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch album')
  }
}
