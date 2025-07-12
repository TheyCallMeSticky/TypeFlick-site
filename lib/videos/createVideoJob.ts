import path from 'node:path'
import { z } from 'zod'
import { db } from '@/lib/db'
import {
  videos,
  videoVariants,
  videoCollaborators,
  activityLogs,
  templates,
  videoStatus,
  videoMetadata,
  publishTarget
} from '@/lib/db/schema'
import { eq, InferInsertModel } from 'drizzle-orm'
import { enqueuePythonJob } from './enqueuePythonJob'
import type { VideoFormat } from '@/lib/db/types' // alias = typeof videoFormat.enumValues[number]
import { mapApiMeta, ApiMetaResult } from '@/lib/seo/mapSeoResult'

/* ------------------------------------------------------------------ */
/* Types helpers                                                      */
/* ------------------------------------------------------------------ */
type VariantInsert = InferInsertModel<typeof videoVariants>
type VideoStatus = (typeof videoStatus.enumValues)[number]

/* ------------------------------------------------------------------ */
/* Helpers pour la table video_metadata                               */
/* ------------------------------------------------------------------ */
type publishTarget = (typeof publishTarget.enumValues)[number]

/* ------------------------------------------------------------------ */
/* Validation schema                                                  */
/* ------------------------------------------------------------------ */
export const newVideoJobSchema = z.object({
  /* contexte */
  userId: z.number().int().positive(),
  teamId: z.number().int().positive(),
  ipAddress: z.string().optional(),

  /* step 1 – text info */
  primaryBeatmaker: z.string().min(1),
  collaborators: z.array(z.string().min(1)).optional(),
  beatName: z.string().min(1),
  typeBeat: z.string().min(1),

  /* step 2 – assets */
  audioPath: z.string().min(1),
  imagePath: z.string().min(1),

  /* step 3 – template & formats */
  templateId: z.number().int().positive(),
  formats: z
    .array(z.enum(['16_9', '1_1', '9_16']))
    .min(1)
    .max(3),
  publishTargets: z.array(z.enum(['youtube', 'tiktok', 'instagram', 'x'])).min(1),

  /* step 4 – optional */
  buyLink: z.string().url().optional()
})
export type NewVideoJobInput = z.infer<typeof newVideoJobSchema>

/* ------------------------------------------------------------------ */
/* Main function                                                      */
/* ------------------------------------------------------------------ */
export async function createVideoJob(rawInput: NewVideoJobInput) {
  /* 1. Validate ----------------------------------------------------- */
  const input = newVideoJobSchema.parse(rawInput)

  /* 2. Insert everything in one short transaction ------------------ */
  const { videoId, templateSlug, variants } = await db.transaction(async (tx) => {
    /* (a) parent video ------------------------------------------- */
    const [{ id: videoId }] = await tx
      .insert(videos)
      .values({
        userId: input.userId,
        primaryBeatmaker: input.primaryBeatmaker,
        beatName: input.beatName,
        typeBeat: input.typeBeat,
        templateId: input.templateId,
        audioPath: input.audioPath,
        imagePath: input.imagePath,
        buyLink: input.buyLink ?? null,
        status: 'pending' satisfies VideoStatus,
        publishTargets: input.publishTargets
      })
      .returning({ id: videos.id })

    /* (b) variants ----------------------------------------------- */
    const variants: VariantInsert[] = input.formats.map((f) => ({
      videoId,
      format: f as VideoFormat,
      status: 'pending' as VideoStatus
    }))
    const inserted = await tx
      .insert(videoVariants)
      .values(variants)
      .returning({ id: videoVariants.id, format: videoVariants.format })

    /* (c) collaborators ------------------------------------------ */
    if (input.collaborators?.length) {
      await tx
        .insert(videoCollaborators)
        .values(input.collaborators.map((name) => ({ videoId, name })))
    }

    /* (d) activity log ------------------------------------------- */
    await tx.insert(activityLogs).values({
      teamId: input.teamId,
      userId: input.userId,
      action: 'CREATE_VIDEO',
      ipAddress: input.ipAddress ?? null
    })

    /* (e) template slug ------------------------------------------ */
    const tpl = await tx.query.templates.findFirst({
      columns: { slug: true },
      where: eq(templates.id, input.templateId)
    })
    if (!tpl) throw new Error('Template not found')

    return { videoId, templateSlug: tpl.slug, variants: inserted }
  }) // ↩︎ transaction ends here — data is committed
  try {
    const metaRes = await fetch(`${process.env.METADATA_API_URL}/api/generate-metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        beat_name: input.beatName,
        type_beat_name: input.typeBeat,
        producer_name: input.primaryBeatmaker,
        colab: input.collaborators?.join(',') ?? '',
        buyLink: input.buyLink ?? ''
      })
    })
    if (metaRes.ok) {
      const meta = (await metaRes.json()) as ApiMetaResult
      const rows = mapApiMeta(videoId, meta) // rows: MetaInsert[]
      if (rows.length) {
        await db.insert(videoMetadata).values(rows)
      }
    } else {
      console.warn('SEO API error', await metaRes.text())
    }
  } catch (e) {
    console.error('SEO API call failed', e)
  }
  /* 4. Queue Python jobs ------------------------------------------- */
  await Promise.all(
    variants.map((v) =>
      enqueuePythonJob({
        variantId: v.id,
        format: v.format as VideoFormat,
        templateSlug,
        audioFilename: path.basename(input.audioPath),
        imageFilename: path.basename(input.imagePath),
        maxDurationSec: 60,
        beatInfo: {
          primary_beatmaker: input.primaryBeatmaker,
          beat_name: input.beatName,
          type_beat_name: input.typeBeat,
          producer_name: input.primaryBeatmaker,
          colab: input.collaborators?.join(',') ?? ''
        }
      })
    )
  )

  /* 5. Return ------------------------------------------------------ */
  return { id: videoId }
}

/* ------------------------------------------------------------------ */
/* Helper called by the worker to close the job --------------------- */
/* ------------------------------------------------------------------ */
export async function markVideoStatus(params: {
  videoId: number
  teamId: number
  status: 'done' | 'failed'
  userId?: number | null
  ipAddress?: string | null
}) {
  const { videoId, teamId, status, userId = null, ipAddress = null } = params

  await db.transaction(async (tx) => {
    await tx.update(videos).set({ status }).where(eq(videos.id, videoId))
    await tx.insert(activityLogs).values({
      teamId,
      userId,
      action: status === 'done' ? 'VIDEO_DONE' : 'VIDEO_FAILED',
      ipAddress
    })
  })
}
