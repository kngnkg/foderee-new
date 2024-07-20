import { albumSimplifiedSchema } from '@/types/album'
import { z } from 'zod'

export const bffAlbumObjectSimplifiedSchema = albumSimplifiedSchema.extend({
  releaseDate: z.string(),
})

export type BffAlbumObjectSimplified = z.infer<
  typeof bffAlbumObjectSimplifiedSchema
>
