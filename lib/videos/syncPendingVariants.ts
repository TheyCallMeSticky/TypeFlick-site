import { db } from '@/lib/db'
import { videoVariants, videos } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { inArray } from 'drizzle-orm'

const PY_API = process.env.NEXT_PUBLIC_API_URL ?? 'http://python-api:8000'
type PyOkStatus = 'pending' | 'processing' | 'done'
type DbStatus = PyOkStatus | 'failed'

/* fetch avec timeout ---------------------------------------------------- */
async function safeFetchStatus(jobUuid: string) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 5_000)
  try {
    const res = await fetch(`${PY_API}/status/${jobUuid}`, { signal: ctrl.signal })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/* helper pour statuts valides ------------------------------------------ */
function mapStatus(s?: string): DbStatus {
  return s === 'pending' || s === 'processing' || s === 'done' ? s : 'failed'
}

/* ---------------------------------------------------------------------- */
export async function syncPendingVariants(userId: number) {
  /* 1. variants à mettre à jour (jobUuid non NULL) ---------------------- */
  const variants = await db
    .select({
      id: videoVariants.id,
      videoId: videoVariants.videoId,
      jobUuid: videoVariants.jobUuid
    })
    .from(videoVariants)
    .innerJoin(videos, eq(videos.id, videoVariants.videoId))
    .where(
      and(
        eq(videos.userId, userId),
        sql`${videoVariants.status} IN ('pending','processing')`,
        sql`${videoVariants.jobUuid} IS NOT NULL`
      )
    )
    .limit(15)

  if (!variants.length) return

  /* 2. appels API Python en parallèle ----------------------------------- */
  const apiResults = await Promise.all(variants.map((v) => safeFetchStatus(v.jobUuid!)))

  /* 3. transaction maj -------------------------------------------------- */
  await db.transaction(async (tx) => {
    const touched = new Set<number>()

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i]
      const api = apiResults[i]
      const dbStatus = mapStatus(api?.status)
      const progress = api?.progress ?? 0
      const outPath = api?.output_path ?? null

      await tx
        .update(videoVariants)
        .set({
          status: dbStatus,
          progress,
          outputPath: outPath,
          updatedAt: sql`NOW()`
        })
        .where(eq(videoVariants.id, variant.id))

      touched.add(variant.videoId)
    }

    /* 4. recalcule le statut global des vidéos touchées ----------------- */
    if (touched.size) {
      for (const videoId of touched) {
        await tx.execute(sql`
        UPDATE videos
          SET status = (
                CASE
                  WHEN NOT EXISTS (
                    SELECT 1 FROM video_variants
                      WHERE video_id = ${videoId}
                        AND status <> 'done'
                  )                     THEN 'done'::video_status_enum

                  WHEN NOT EXISTS (
                    SELECT 1 FROM video_variants
                      WHERE video_id = ${videoId}
                        AND status NOT IN ('failed')
                  )                     THEN 'failed'::video_status_enum

                  ELSE 'processing'::video_status_enum
                END
              ),
              updated_at = NOW()
        WHERE id = ${videoId}
      `)
      }
    }
  })
}
