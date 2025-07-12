'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ProgressBar from '@/components/ui/ProgressBar'
import { DownloadIcon, SaveIcon } from 'lucide-react'

type Variant = {
  id: number
  format: '16_9' | '1_1' | '9_16'
  status: 'pending' | 'processing' | 'done' | 'failed'
  progress: number | null
  outputPath: string | null
}

type Platform = 'youtube' | 'instagram' | 'tiktok' | 'x'

type Video = {
  id: number
  beatName: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  publishTargets: Platform[]
}

type Metadata = {
  platform: Platform
  title: string
  description: string
  hashtags: string[]
}

export default function VideoDetailClient({
  video,
  variants,
  metadata
}: {
  video: Video
  variants: Variant[]
  metadata: Metadata[]
}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const initial = (metadata[0]?.platform ?? video.publishTargets[0] ?? 'youtube') as Platform
  const [active, setActive] = useState<Platform>(initial)
  const meta = metadata.find((m) => m.platform === active)

  /* ────────── React-Hook-Form setup */
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset
  } = useForm<{ title: string; description: string; hashtags: string }>({
    defaultValues: {
      title: meta?.title ?? '',
      description: meta?.description ?? '',
      hashtags: (meta?.hashtags ?? []).join(' ')
    }
  })

  useEffect(() => {
    const m = metadata.find((x) => x.platform === active)
    reset({
      title: m?.title ?? '',
      description: m?.description ?? '',
      hashtags: (m?.hashtags ?? []).join(' ')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const onSubmit = async (data: any) => {
    setSaving(true)
    const res = await fetch(`/api/videos/${video.id}/metadata/${active}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        hashtags: data.hashtags.split(/\s+/).filter(Boolean)
      })
    })
    setSaving(false)
    if (res.ok) router.refresh()
    else alert('Error while saving metadata')
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">{video.beatName}</h1>

      {/* 1. Variants */}
      <section>
        <h2 className="font-semibold mb-3">Rendered formats</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((v) => (
            <div key={v.id} className="border rounded-xl p-4 flex flex-col gap-3 bg-card">
              <span className="text-sm font-medium">Format&nbsp;{v.format.replace('_', ':')}</span>
              <ProgressBar value={v.progress ?? 0} status={v.status} />

              {v.status === 'done' && v.outputPath && (
                <a
                  href={`/files/${encodeURI(v.outputPath.replace(/^\/?app\/files\//, ''))}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                  download
                >
                  <DownloadIcon className="w-4 h-4" /> Download
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Metadata */}
      <section>
        <h2 className="font-semibold mb-3">Video metadata</h2>
        <div className="flex gap-2 mb-4">
          {[...new Set([...video.publishTargets, ...metadata.map((m) => m.platform)])].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActive(p)}
              className={`px-3 py-1 rounded text-sm ${
                active === p ? 'bg-primary text-white' : 'bg-muted-foreground/20'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full rounded border px-3 py-2 bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full rounded border px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Hashtags (separated by spaces)</label>
            <input
              {...register('hashtags')}
              className="w-full rounded border px-3 py-2 bg-background"
            />
          </div>

          {/* target list */}
          <p className="text-xs text-muted-foreground">
            Will be used for&nbsp;
            {video.publishTargets.join(', ')}.
          </p>

          <button
            disabled={!isDirty || saving}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
          >
            <SaveIcon className="w-4 h-4" /> Save
          </button>
        </form>
      </section>
    </div>
  )
}
