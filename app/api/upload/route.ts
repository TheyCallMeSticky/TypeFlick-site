import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'crypto'
import { mkdir } from 'node:fs/promises'

// dossier partagé déclaré dans docker-compose
const AUDIO_DIR = process.env.AUDIO_DIR || '/app/files/audio'
const IMAGE_DIR = process.env.IMAGE_DIR || '/app/files/images'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const blob = form.get('file') as File | null
  const kind = form.get('type') as 'audio' | 'image' | null
  if (!blob || !kind) {
    return NextResponse.json({ error: 'Bad form-data' }, { status: 400 })
  }

  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const ext = path.extname(blob.name) || (kind === 'audio' ? '.mp3' : '.png')
  const filename = `${randomUUID()}${ext}`
  const dstDir = kind === 'audio' ? AUDIO_DIR : IMAGE_DIR

  await mkdir(dstDir, { recursive: true })
  await fs.writeFile(path.join(dstDir, filename), buffer)

  return NextResponse.json({ filename })
}
