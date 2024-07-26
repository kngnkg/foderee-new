import { AlbumArtistsNames } from '@/components/album-artists-names'
import type { AlbumSimplified } from '@/types/album'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('AlbumArtistsNames', () => {
  it('正しくレンダリングされる', () => {
    const album: Pick<AlbumSimplified, 'artists'> = {
      artists: [
        { name: 'Artist 1', artistId: '1' },
        { name: 'Artist 2', artistId: '2' },
        { name: 'Artist 3', artistId: '3' },
      ],
    }

    const { getByText } = render(<AlbumArtistsNames album={album} />)

    expect(getByText('Artist 1, Artist 2, Artist 3')).toBeInTheDocument()
  })

  it('classNameが正しく適用される', async () => {
    const album: Pick<AlbumSimplified, 'artists'> = {
      artists: [
        { name: 'Artist 1', artistId: '1' },
        { name: 'Artist 2', artistId: '2' },
        { name: 'Artist 3', artistId: '3' },
      ],
    }

    const { getByText } = render(
      <AlbumArtistsNames album={album} className="text-lg" />,
    )

    expect(getByText('Artist 1, Artist 2, Artist 3')).toHaveClass('text-lg')
  })

  it('アーティストが存在しない場合は何も表示しない', async () => {
    const album: Pick<AlbumSimplified, 'artists'> = {
      artists: [],
    }

    const { container } = render(<AlbumArtistsNames album={album} />)

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
