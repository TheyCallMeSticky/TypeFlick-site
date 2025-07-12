// lib/videos/enqueuePythonJob.ts
import { db } from '@/lib/db'
import { videoVariants } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://python-api:8000'

export async function enqueuePythonJob(opts: {
  variantId: number
  format: '16_9' | '1_1' | '9_16'
  templateSlug: string
  audioFilename: string
  imageFilename: string
  maxDurationSec: number
  beatInfo: {
    primary_beatmaker: string
    beat_name: string
    type_beat_name: string
    producer_name: string
    colab?: string | null
  }
}) {
  /* 1. POST /generate --------------------------------------------------- */
  const res = await fetch(`${API_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...opts.beatInfo,
      template: opts.templateSlug,
      format: opts.format,
      audio_filename: opts.audioFilename,
      image_filename: opts.imageFilename,
      max_duration: opts.maxDurationSec
    })
  })
  if (!res.ok) throw new Error(await res.text())
  const { job_id } = (await res.json()) as { job_id: string }

  /* 2. Màj video_variants ----------------------------------------------- */
  await db
    .update(videoVariants)
    .set({ jobUuid: job_id }) // ← on garde la liaison DB ↔ Redis
    .where(eq(videoVariants.id, opts.variantId))

  return { jobUuid: job_id }
}
