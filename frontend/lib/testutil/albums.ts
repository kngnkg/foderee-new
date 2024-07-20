import type { Album, Artist, Track } from '@/types/album'
import type {
  SpotifyAlbumSearchResponse,
  SpotifySingleAlbumResponse,
} from '@/types/spotify/album'
import {
  spotifyAlbumSearchResponseSchema,
  spotifySingleAlbumResponseSchema,
} from '@/types/spotify/album'

export const generateArtistForTest = (data: Partial<Artist>): Artist => ({
  artistId: 'testArtistId',
  spotifyUri: 'spotify:artist:123456',
  spotifyUrl: 'http://example.com/artist',
  name: 'Test Artist',
  imageUrl: 'http://example.com/artist.jpg',
  ...data,
})

export const generateTrackForTest = (data: Partial<Track>): Track => ({
  trackId: 'testTrackId',
  spotifyUri: 'spotify:track:123456',
  spotifyUrl: 'http://example.com/track',
  title: 'Test Track',
  durationMs: 1000,
  trackNumber: 1,
  ...data,
})

export const generateAlbumForTest = (data: Partial<Album>): Album => ({
  albumId: 'testAlbumId',
  spotifyUri: 'spotify:album:123456',
  spotifyUrl: 'http://example.com/album',
  name: 'Test Album',
  artists: [generateArtistForTest({})],
  tracks: [generateTrackForTest({})],
  releaseDate: new Date('2021-01-01'),
  coverUrl: 'http://example.com/album.jpg',
  ...data,
})

export const generateSpotifySingleAlbumResponseForTest =
  (): SpotifySingleAlbumResponse => {
    const response = {
      album_type: 'compilation',
      total_tracks: 9,
      available_markets: ['CA', 'BR', 'IT'],
      external_urls: {
        spotify: 'https://example.com/album',
      },
      href: 'string',
      id: '2up3OPMp9Tb4dAKM2erWXQ',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
          height: 300,
          width: 300,
        },
      ],
      name: 'string',
      release_date: '1981-12',
      release_date_precision: 'year',
      restrictions: {
        reason: 'market',
      },
      type: 'album',
      uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
      artists: [
        {
          external_urls: {
            spotify: 'https://example.com/album',
          },
          href: 'string',
          id: 'string',
          name: 'string',
          type: 'artist',
          uri: 'string',
        },
      ],
      tracks: {
        href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20',
        limit: 20,
        next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        offset: 0,
        previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        total: 4,
        items: [
          {
            artists: [
              {
                external_urls: {
                  spotify: 'https://example.com/artist',
                },
                href: 'string',
                id: 'string',
                name: 'string',
                type: 'artist',
                uri: 'string',
              },
            ],
            available_markets: ['string'],
            disc_number: 0,
            duration_ms: 0,
            explicit: false,
            external_urls: {
              spotify: 'https://example.com/track',
            },
            href: 'string',
            id: 'string',
            is_playable: false,
            linked_from: {
              external_urls: {
                spotify: 'https://example.com/album',
              },
              href: 'string',
              id: 'string',
              type: 'track',
              uri: 'string',
            },
            restrictions: {
              reason: 'string',
            },
            name: 'string',
            preview_url: 'string',
            track_number: 0,
            type: 'track',
            uri: 'string',
          },
        ],
      },
      copyrights: [
        {
          text: 'string',
          type: 'C',
        },
      ],
      external_ids: {
        isrc: 'string',
        ean: 'string',
        upc: 'string',
      },
      genres: ['Egg punk', 'Noise rock'],
      label: 'string',
      popularity: 0,
    }

    return spotifySingleAlbumResponseSchema.parse(response)
  }

export const generateAlbumSearchResponseForTest =
  (): SpotifyAlbumSearchResponse => {
    const response = {
      albums: {
        href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20',
        limit: 20,
        next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        offset: 0,
        previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        total: 4,
        items: [
          {
            album_type: 'compilation',
            total_tracks: 9,
            available_markets: ['CA', 'BR', 'IT'],
            external_urls: {
              spotify: 'https://example.com/album',
            },
            href: 'string',
            id: '2up3OPMp9Tb4dAKM2erWXQ',
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
                height: 300,
                width: 300,
              },
            ],
            name: 'string',
            release_date: '1981-12',
            release_date_precision: 'year',
            restrictions: {
              reason: 'market',
            },
            type: 'album',
            uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
            artists: [
              {
                external_urls: {
                  spotify: 'https://example.com/album',
                },
                href: 'string',
                id: 'string',
                name: 'string',
                type: 'artist',
                uri: 'string',
              },
            ],
          },
        ],
      },
    }

    return spotifyAlbumSearchResponseSchema.parse(response)
  }
