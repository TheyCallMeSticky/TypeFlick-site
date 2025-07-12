// lib/db/types.ts
import { videoFormat } from '@/lib/db/schema'

export type VideoFormat = (typeof videoFormat.enumValues)[number]

export type SeoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'x'
export type Metadata = {
  platform: SeoPlatform
  title: string
  description: string
  hashtags: string[]
}
