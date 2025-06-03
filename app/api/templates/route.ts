import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { templates as templatesTable } from '@/lib/db/schema'

export async function GET() {
  const all = await db.select().from(templatesTable)
  return NextResponse.json(all)
}
