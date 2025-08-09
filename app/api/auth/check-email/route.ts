// app/api/auth/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db/drizzle'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const checkEmailSchema = z.object({
  email: z.string().email('Invalid email format')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = checkEmailSchema.parse(body)

    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return NextResponse.json({
      exists: existingUser.length > 0,
      email
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    console.error('Email check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
