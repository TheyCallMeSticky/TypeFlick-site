// app/api/videos/[id]/route.ts
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { videos } from '@/lib/db/schema'
import { getSession } from '@/lib/auth/session'

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // ← params est une Promise
) => {
  // On attend la Promise avant d’accéder à id
  const { id } = await params

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // Suppression de la vidéo (les FK « ON DELETE CASCADE » gèrent le reste)
  await db.delete(videos).where(eq(videos.id, Number(id)))

  return NextResponse.json({ ok: true })
}
