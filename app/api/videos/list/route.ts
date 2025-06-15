// app/api/videos/list/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { videos, videoVariants } from '@/lib/db/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { getSession } from '@/lib/auth/session'
import { syncPendingVariants } from '@/lib/videos/syncPendingVariants'

/* util ──────────────────────────────────────── */
function pgArrayToJs(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[]

  if (typeof value === 'string') {
    // « {16_9,1_1} »  →  ['16_9','1_1']
    return value
      .replace(/^{|}$/g, '') // retire { }
      .replace(/"/g, '') // retire éventuels guillemets
      .split(',')
      .filter(Boolean)
  }

  return []
}

/* handler ───────────────────────────────────── */
export async function GET(req: NextRequest) {
  const u = new URL(req.url!)
  const offset = Number(u.searchParams.get('offset') ?? 0)
  const limit = Number(u.searchParams.get('limit') ?? 20)

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  // ← NOUVEAU : mise à jour silencieuse
  await syncPendingVariants(userId)

  const raw = await db
    .select({
      id: videos.id,
      beatName: videos.beatName,
      status: videos.status,
      createdAt: videos.createdAt,
      imageFilename: videos.imagePath,
      audioFilename: videos.audioPath,
      formats: sql<string>`array_agg(${videoVariants.format})`
    })
    .from(videos)
    .leftJoin(videoVariants, eq(videos.id, videoVariants.videoId))
    .where(eq(videos.userId, userId))
    .groupBy(videos.id)
    .orderBy(desc(videos.createdAt))
    .limit(limit)
    .offset(offset)

  /* normalisation : formats → string[] */
  const data = raw.map((row) => ({
    ...row,
    formats: pgArrayToJs(row.formats) // <── conversion
  }))

  return NextResponse.json(data)
}
