import type {
  Album,
  AlbumSimplified,
  ArtistSimplified,
  Track,
} from '@/types/album'
import type {
  SpotifyAlbumObjectSimplified,
  SpotifyArtistObjectSimplified,
  SpotifySingleAlbumResponse,
  SpotifyTrackObjectSimplified,
} from '@/types/spotify/album'

export function toArtistSimplified(
  data: SpotifyArtistObjectSimplified,
): ArtistSimplified {
  return {
    artistId: data.id,
    name: data.name,
  }
}

export function toTrack(data: SpotifyTrackObjectSimplified): Track {
  return {
    trackId: data.id,
    spotifyUri: data.uri,
    spotifyUrl: data.external_urls.spotify,
    title: data.name,
    durationMs: data.duration_ms,
    trackNumber: data.track_number,
  }
}

export function toAlbum(data: SpotifySingleAlbumResponse): Album {
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
  data: SpotifyAlbumObjectSimplified,
): AlbumSimplified {
  return {
    albumId: data.id,
    name: data.name,
    artists: data.artists.map((artist) => toArtistSimplified(artist)),
    coverUrl: data.images[0].url,
    releaseDate: new Date(data.release_date),
  }
}
