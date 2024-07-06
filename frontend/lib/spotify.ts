import SpotifyWebApi from 'spotify-web-api-node'

import { env } from '@/env.mjs'
import type {
  Album,
  AlbumSimplified,
  ArtistSimplified,
  Track,
} from '@/types/album'

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

export function toArtistSimplified(
  data: SpotifyApi.ArtistObjectSimplified,
): ArtistSimplified {
  return {
    artistId: data.id,
    name: data.name,
  }
}

export function toTrack(data: SpotifyApi.TrackObjectSimplified): Track {
  return {
    trackId: data.id,
    spotifyUri: data.uri,
    spotifyUrl: data.external_urls.spotify,
    title: data.name,
    durationMs: data.duration_ms,
    trackNumber: data.track_number,
  }
}

export function toAlbum(data: SpotifyApi.SingleAlbumResponse): Album {
  return {
    albumId: data.id,
    spotifyUri: data.uri,
    spotifyUrl: data.external_urls.spotify,
    name: data.name,
    artists: data.artists.map((artist) => toArtistSimplified(artist)),
    tracks: data.tracks.items.map((track) => toTrack(track)),
    coverUrl: data.images[0].url,
    releaseDate: new Date(data.release_date),
  }
}

export function toAlbumSimplified(
  data: SpotifyApi.AlbumObjectSimplified,
): AlbumSimplified {
  return {
    albumId: data.id,
    name: data.name,
    artists: data.artists.map((artist) => toArtistSimplified(artist)),
    coverUrl: data.images[0].url,
    releaseDate: new Date(data.release_date),
  }
}
