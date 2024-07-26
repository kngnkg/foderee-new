import { albumSimplifiedSchema } from '@/types/album'
import { paginationSchema } from '@/types/pagination'
import { z } from 'zod'

export const bffAlbumObjectSimplifiedSchema = albumSimplifiedSchema.extend({
  releaseDate: z.string(),
})

export type BffAlbumObjectSimplified = z.infer<
  typeof bffAlbumObjectSimplifiedSchema
>

export const pagedBffAlbums = paginationSchema.extend({
  albums: z.array(bffAlbumObjectSimplifiedSchema),
})

export type PagedBffAlbums = z.infer<typeof pagedBffAlbums>
