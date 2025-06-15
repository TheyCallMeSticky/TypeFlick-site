// app/api/videos/[id]/route.ts
import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { videos, videoVariants } from '@/lib/db/schema'
import { getSession } from '@/lib/auth/session'

const FILES_ROOT  = '/app/files'
const AUDIO_DIR   = path.join(FILES_ROOT, 'audio')
const IMAGE_DIR   = path.join(FILES_ROOT, 'images')
const VIDEO_DIR   = path.join(FILES_ROOT, 'videos')


const stripAppFiles = (p: string) => p.replace(/^\/?app\/files\//, '') 

const toAbs = (raw: string): string => {
  let p = raw

  if (p.startsWith('/files/')) p = p.slice(7)           
  p = stripAppFiles(p)                                  

  if (path.isAbsolute(p)) return p                      

  if (p.startsWith('audio/') || p.startsWith('images/') || p.startsWith('videos/'))
    return path.join(FILES_ROOT, p)               

  if (p.endsWith('.mp3'))               return path.join(AUDIO_DIR,  p)
  if (/\.(png|jpe?g|webp)$/i.test(p))   return path.join(IMAGE_DIR,  p)

  return path.join(VIDEO_DIR, p)                      
}

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params
  const videoId = Number(id)

  /* 1. Auth ---------------------------------------------------------------- */
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  /* 2. Charge la vidéo + chemins ------------------------------------------ */
  const [video] = await db
    .select({
      userId: videos.userId,
      audioPath: videos.audioPath,
      imagePath: videos.imagePath
    })
    .from(videos)
    .where(eq(videos.id, videoId))

  if (!video || video.userId !== session.user.id) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const variantRows = await db
    .select({ outputPath: videoVariants.outputPath })
    .from(videoVariants)
    .where(eq(videoVariants.videoId, videoId))

  /* 3. Supprime la vidéo (FK cascade) ------------------------------------- */
  await db.delete(videos).where(eq(videos.id, videoId))

  /* 4. Supprime physiquement les fichiers --------------------------------- */
  const pathsToDelete: string[] = [
    video.audioPath,
    video.imagePath,
    ...variantRows.map((v) => v.outputPath)
  ].filter((p): p is string => !!p)

  const absPaths = pathsToDelete.map(toAbs)
  // console.log('[DELETE /api/videos]', { videoId, absPaths })
  // console.log('variantRows debug', variantRows)

  await Promise.allSettled(absPaths.map((p) => fs.unlink(p)))

  return NextResponse.json({ ok: true })
}
