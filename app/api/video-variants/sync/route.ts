import { NextResponse } from 'next/server'
import { eq, ne, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { videoVariants, videos } from '@/lib/db/schema'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PY_API = process.env.NEXT_PUBLIC_API_URL || 'http://python-api:8000'

export async function POST() {
  /* 1. variants encore actifs ------------------------------------------- */
  const todo = await db
    .select({
      id: videoVariants.id,
      videoId: videoVariants.videoId,
      jobUuid: videoVariants.jobUuid
    })
    .from(videoVariants)
    .where(ne(videoVariants.status, 'done'))

  /* 2. boucle réseau + update ------------------------------------------- */
  for (const v of todo) {
    if (!v.jobUuid) continue
    const res = await fetch(`${PY_API}/status/${v.jobUuid}`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
    if (!res) continue // réseau KO

    await db
      .update(videoVariants)
      .set({
        status: res.status as 'pending' | 'processing' | 'done' | 'failed',
        progress: res.progress ?? null,
        outputPath: res.output_path || null,
        updatedAt: sql`NOW()`
      })
      .where(eq(videoVariants.id, v.id))
  }

  /* 3. Vidéos terminées ? ------------------------------------------------ */
  await db.execute(sql`
    UPDATE videos
       SET status     = 'done',
           updated_at = NOW()
     WHERE id IN (
       SELECT video_id
         FROM video_variants
     GROUP BY video_id
       HAVING BOOL_AND(status = 'done')
     );
  `)

  return NextResponse.json({ ok: true, processed: todo.length })
}
