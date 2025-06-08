// lib/db/types.ts
import { videoFormat } from '@/lib/db/schema'

export type VideoFormat = (typeof videoFormat.enumValues)[number]
