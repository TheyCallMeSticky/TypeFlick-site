import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { videoMetadata, publishTarget } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; platform: string } }
) {
  const videoId = Number(params.id)
  const platform = params.platform as (typeof publishTarget.enumValues)[number]

  const { title, description, hashtags } = (await req.json()) as {
    title: string
    description: string
    hashtags: string[]
  }

  await db
    .insert(videoMetadata)
    .values({ videoId, platform, title, description, hashtags })
    .onConflictDoUpdate({
      target: [videoMetadata.videoId, videoMetadata.platform],
      set: { title, description, hashtags }
    })

  return NextResponse.json({ ok: true })
}
