import { publishTarget, videoMetadata } from '@/lib/db/schema'
import type { InferInsertModel } from 'drizzle-orm'

type Platform = (typeof publishTarget.enumValues)[number]
export type ApiMetaResult = Record<
  string,
  { title: string; description: string; hashtags: string[] }
>

function isPlatform(p: string): p is Platform {
  return (publishTarget.enumValues as readonly string[]).includes(p)
}

type MetaInsert = InferInsertModel<typeof videoMetadata>

export function mapApiMeta(videoId: number, api: ApiMetaResult): MetaInsert[] {
  return (Object.entries(api) as [string, ApiMetaResult[string]][])
    .filter(([p]) => isPlatform(p))
    .map(([platform, m]) => ({
      videoId,
      platform: platform as Platform, // 🟢 cast ≠ string
      title: m.title.trim(),
      description: m.description.trim(),
      hashtags: m.hashtags.map((h) => h.replace(/\s+/g, ''))
    }))
}
