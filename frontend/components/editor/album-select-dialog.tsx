'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAlbums } from '@/hooks/albums/use-albums'

import { AlbumArt } from '@/components/album-art'
import { AlbumList } from '@/components/editor/album-list'
import { Icon } from '@/components/icon'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { AlbumSimplified } from '@/types/album'
import { useFormContext } from 'react-hook-form'

interface AlbumSelectDialogProps {
  initialAlbum?: AlbumSimplified
}

export const AlbumSelectDialog: React.FC<AlbumSelectDialogProps> = ({
  initialAlbum,
}) => {
  const [inputValue, setInputValue] = React.useState<string>('')
  const [query, setQuery] = React.useState<string>('')
  const { data, error, isLoading, loadMore } = useAlbums({
    query,
    limit: 20,
  })
  const { getValues } = useFormContext()
  const [album, setAlbum] = React.useState<AlbumSimplified | undefined>(
    initialAlbum,
  )

  const onClick = () => {
    // stateに値をセットしてAlbumArtを更新
    setAlbum(getValues('album'))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onKeyDown = () => {
    setQuery(inputValue)
  }

  if (error) {
    console.error(error)
    return <p>Something went wrong.</p>
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div>
            {album ? (
              <AlbumArt album={album} size="m" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Icon type="add" className="absolute size-16" />
                <div className="sm:size-38 size-28 rounded-none bg-zinc-700" />
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="flex h-4/6 flex-col gap-8">
          <DialogHeader className="mt-8">
            <DialogTitle className="mb-2 flex justify-center">
              アルバムを選択
            </DialogTitle>
            <SearchBar
              autoFocus
              value={inputValue}
              onChange={onChange}
              onEnterKeyDown={onKeyDown}
            />
          </DialogHeader>
          <ScrollArea>
            {query && data ? (
              <>
                <DialogClose>
                  <AlbumList
                    data={data}
                    isLoading={isLoading}
                    onClick={onClick}
                  />
                </DialogClose>
                <div className="mb-20 flex flex-col items-center">
                  <Button variant="ghost" size="lg" onClick={() => loadMore()}>
                    もっと見る
                  </Button>
                </div>
              </>
            ) : (
              <p>検索条件を入力してください。</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* アルバム名とアーティスト名を表示 */}
      {album && (
        <>
          <div className="text-sm sm:text-base">{album.name}</div>
          <div className="text-xs sm:text-sm">
            {album.artists.map((artist, idx) => (
              <span key={idx}>
                {artist.name}
                {idx !== album.artists.length - 1 && ', '}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
