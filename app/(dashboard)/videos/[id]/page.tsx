import { db } from '@/lib/db'
import { videos, videoVariants, videoMetadata } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import VideoDetailClient from './VideoDetailClient'

/** Métadonnées d’une plateforme */
type Platform = 'youtube' | 'instagram' | 'tiktok' | 'x'
type MetaRow = {
  platform: Platform
  title: string
  description: string
  hashtags: string[]
}
/* helper : force une valeur non-nulle */
const sanitizeStatus = (
  s: 'pending' | 'processing' | 'done' | 'failed' | null
): 'pending' | 'processing' | 'done' | 'failed' => {
  return (s ?? 'pending') as 'pending' | 'processing' | 'done' | 'failed'
}
const sanitizeHashtags = (raw: unknown): string[] | null => {
  if (Array.isArray(raw)) return raw as string[]
  if (typeof raw === 'string' && raw.trim()) return raw.trim().split(/\s+/)
  return null
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  /* ─────── vidéo principale ─────── */
  const [videoRow] = await db.select().from(videos).where(eq(videos.id, id)).limit(1)

  if (!videoRow) return <p className="p-4">Video not found</p>

  /* ─────── variantes ─────── */
  const variantRows = await db
    .select({
      id: videoVariants.id,
      format: videoVariants.format,
      status: videoVariants.status,
      progress: videoVariants.progress,
      outputPath: videoVariants.outputPath
    })
    .from(videoVariants)
    .where(eq(videoVariants.videoId, id))

  /* ─────── mapping vers props strictes ─────── */
  const video = {
    id: videoRow.id,
    beatName: videoRow.beatName,
    status: sanitizeStatus(videoRow.status),
    publishTargets: videoRow.publishTargets as ('youtube' | 'tiktok' | 'instagram' | 'x')[]
  }

  /* ─────── SEO par plateforme ─────── */
  const metaRowsRaw = await db.select().from(videoMetadata).where(eq(videoMetadata.videoId, id))

  const metaRows: MetaRow[] = metaRowsRaw.map((m) => ({
    platform: m.platform,
    title: m.title,
    description: m.description,
    hashtags: m.hashtags ?? []
  }))

  const variants = variantRows.map((v) => ({
    id: v.id,
    format: v.format,
    status: sanitizeStatus(v.status),
    progress: v.progress,
    outputPath: v.outputPath
  }))

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <VideoDetailClient video={video} variants={variants} metadata={metaRows} />
    </div>
  )
}
