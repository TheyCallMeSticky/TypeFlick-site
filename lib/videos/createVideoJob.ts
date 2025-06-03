/* ------------------------------------------------------------------
   createVideoJob.ts  –  Service d'insertion & suivi « job vidéo »
   ------------------------------------------------------------------
   • Valide le payload entrant (zod)
   • Ouvre une transaction Drizzle
       1) INSERT dans videos
       2) INSERT N x video_variants
       3) INSERT N x video_collaborators (facultatif)
       4) INSERT ligne activity_logs (CREATE_VIDEO)
   • Exporte aussi un helper pour marquer VIDEO_DONE / VIDEO_FAILED
-------------------------------------------------------------------*/

import { z } from 'zod'
import { db } from '@/lib/db'
import {
  videos,
  videoVariants,
  videoCollaborators,
  activityLogs,
  videoFormat,
  videoStatus
} from '@/lib/db/schema'
import { InferInsertModel, eq } from 'drizzle-orm' // au tout début

type VariantInsert = InferInsertModel<typeof videoVariants>
type VideoFormat = (typeof videoFormat.enumValues)[number]
type VideoStatus = (typeof videoStatus.enumValues)[number]

/* ------------------------------------------------------------------
   1. Schéma d'entrée (création de job)
-------------------------------------------------------------------*/
export const newVideoJobSchema = z.object({
  // Contexte
  userId: z.number().int().positive(),
  teamId: z.number().int().positive(),
  ipAddress: z.string().optional(),

  // Étape 1 (infos texte)
  primaryBeatmaker: z.string().min(1),
  collaborators: z.array(z.string().min(1)).optional(),
  beatName: z.string().min(1),
  typeBeat: z.string().min(1),

  // Étape 3 (template + formats)
  templateId: z.number().int().positive(),
  formats: z
    .array(z.enum(['16_9', '1_1', '9_16']))
    .min(1)
    .max(3),
  publishTargets: z.array(z.enum(['youtube', 'tiktok', 'instagram'])).min(1),

  // Étape 2 (assets)
  audioPath: z.string().min(1),
  imagePath: z.string().min(1),

  // Étape 4 (optionnel)
  buyLink: z.string().url().optional()
})

export type NewVideoJobInput = z.infer<typeof newVideoJobSchema>

/* ------------------------------------------------------------------
   2. Fonction de création
-------------------------------------------------------------------*/
export async function createVideoJob(rawInput: NewVideoJobInput) {
  // 2.1  Validation
  const input = newVideoJobSchema.parse(rawInput)
  console.log(rawInput)
  // 2.2 Transaction Drizzle
  const jobId = await db.transaction(async (tx) => {
    /* (a) Vidéo « parent » */
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
        status: 'pending' satisfies (typeof videoStatus.enumValues)[number],
        publishTargets: input.publishTargets
      })
      .returning({ id: videos.id })

    /* (b) Formats à rendre */
    await tx.insert(videoVariants).values(
      input.formats.map<VariantInsert>((f) => ({
        videoId,
        format: f as VideoFormat,
        status: 'pending' as VideoStatus
      }))
    )

    /* (c) Collaborateurs éventuels */
    if (input.collaborators?.length) {
      await tx
        .insert(videoCollaborators)
        .values(input.collaborators.map((name) => ({ videoId, name })))
    }

    /* (d) Log d'activité (CREATE_VIDEO) */
    await tx.insert(activityLogs).values({
      teamId: input.teamId,
      userId: input.userId,
      action: 'CREATE_VIDEO',
      ipAddress: input.ipAddress ?? null
    })

    return videoId
  })

  return { jobId }
}

/* ------------------------------------------------------------------
   3. Helper de statut final (à appeler depuis le worker)
-------------------------------------------------------------------*/
export async function markVideoStatus(params: {
  videoId: number
  teamId: number
  status: 'done' | 'failed'
  userId?: number | null
  ipAddress?: string | null
}) {
  const { videoId, teamId, status, userId = null, ipAddress = null } = params

  await db.transaction(async (tx) => {
    // (1) Mise à jour de la table videos
    await tx.update(videos).set({ status }).where(eq(videos.id, videoId))

    // (2) Log d'activité
    await tx.insert(activityLogs).values({
      teamId,
      userId,
      action: status === 'done' ? 'VIDEO_DONE' : 'VIDEO_FAILED',
      ipAddress
    })
  })
}
