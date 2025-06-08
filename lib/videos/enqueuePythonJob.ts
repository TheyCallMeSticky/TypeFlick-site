// lib/videos/enqueuePythonJob.ts

import type { VideoFormat } from '@/lib/db/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function enqueuePythonJob(opts: {
  variantId: number // DB id of video_variants row
  format: VideoFormat // '16_9' | '1_1' | '9_16'
  templateSlug: string // e.g. 'vinyl'
  audioFilename: string // foo.mp3  (already copied to shared volume)
  imageFilename: string // bar.jpg
  maxDurationSec: number // e.g. 60
  beatInfo: {
    primary_beatmaker: string
    beat_name: string
    type_beat_name: string
    producer_name: string
    colab: string
  }
}) {
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
  return (await res.json()) as { job_id: string }
}
