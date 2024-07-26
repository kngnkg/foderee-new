'use client'

import { SeeMoreButton } from '@/components/see-more-button'
import { DialogClose } from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAlbums } from '@/hooks/albums/use-albums'

import { AlbumArt } from '@/components/album-art'
import { AlbumArtistsNames } from '@/components/album-artists-names'
import { AlbumList } from '@/components/editor/album-list'
import { AlbumListSkeleton } from '@/components/editor/album-list-skeleton'
import { Icon } from '@/components/icon'
import { SearchBar } from '@/components/search-bar'
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
  const {
    pagedAlbumsList,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useAlbums({
    query,
    limit: 20,
  })
  const { getValues } = useFormContext()
  const [album, setAlbum] = React.useState<AlbumSimplified | undefined>(
    initialAlbum,
  )

  const onClick = () => setAlbum(getValues('album'))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)

  const onKeyDown = () => setQuery(inputValue)

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div>
            {album ? (
              <>
                <AlbumArt album={album} size="m" />
                {/* アルバム名とアーティスト名を表示 */}
                <div className="text-sm sm:text-base">{album.name}</div>
                <AlbumArtistsNames album={album} />
              </>
            ) : (
              <div className="relative flex items-center justify-center">
                <Icon type="add" className="absolute size-16" />
                <div className="sm:size-38 size-28 rounded-none bg-zinc-700" />
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="flex h-4/6 flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="mb-2 flex justify-center">
              アルバムを選択
            </DialogTitle>
            {/* Descriptionは不要だが警告が出るのでVisuallyHiddenで隠す */}
            <VisuallyHidden.Root>
              <DialogDescription>description</DialogDescription>
            </VisuallyHidden.Root>
            <SearchBar
              autoFocus
              value={inputValue}
              onChange={onChange}
              onEnterKeyDown={onKeyDown}
            />
          </DialogHeader>
          <ScrollArea className="size-full p-6 pt-0">
            {error ? (
              <p className="mt-6">Something went wrong.</p>
            ) : (
              <>
                {!query ? (
                  <p>検索条件を入力してください。</p>
                ) : (
                  <>
                    {!pagedAlbumsList ? (
                      <AlbumListSkeleton count={10} />
                    ) : (
                      <>
                        <DialogClose>
                          <AlbumList
                            pagedAlbumsList={pagedAlbumsList}
                            onClick={onClick}
                          />
                        </DialogClose>
                        <div className="flex flex-col items-center">
                          {!isReachingEnd && (
                            <SeeMoreButton
                              isLoading={
                                isLoading ||
                                (isLoadingMore !== undefined && isLoadingMore)
                              }
                              loadMore={loadMore}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
