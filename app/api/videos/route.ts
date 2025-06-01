/* ------------------------------------------------------------------
   app/api/videos/route.ts  –  API endpoint (POST /api/videos)
   ------------------------------------------------------------------
   • Accepte un JSON ou multipart/form-data (assets déjà uploadés)
   • Valide via le schéma exporté par createVideoJob.ts
   • Crée le job (DB + ActivityLog)
   • Retourne 201 { jobId } ou 400 en cas d'erreur
-------------------------------------------------------------------*/
import { NextRequest, NextResponse } from 'next/server'
import { createVideoJob, newVideoJobSchema } from '@/lib/videos/createVideoJob'

/**
 * POST /api/videos
 * ------------------------------------------------------------------
 * Expected JSON body :
 * {
 *   userId: number,
 *   teamId: number,
 *   primaryBeatmaker: string,
 *   collaborators?: string[],
 *   beatName: string,
 *   typeBeat: string,
 *   templateId: number,
 *   formats: ['16_9' | '1_1' | '9_16', ...],
 *   audioPath: string,
 *   imagePath: string,
 *   buyLink?: string
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-real-ip') || req.ip || null

    const body = await req.json()
    // Merge IP into payload for logging
    const parsed = newVideoJobSchema.parse({ ...body, ipAddress: ip })

    const { jobId } = await createVideoJob(parsed)

    return NextResponse.json({ jobId }, { status: 201 })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}

// Optionnel : GET pour debug (liste dernière vidéo)
// export async function GET() {
//   const list = await db.query.videos.findMany({ limit: 5, orderBy: (v) => desc(v.createdAt) });
//   return NextResponse.json(list);
// }
