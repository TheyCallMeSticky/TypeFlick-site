import { NextResponse } from 'next/server'
import { getUser } from '@/lib/db/queries'

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      planName: user.planName,
      subscriptionStatus: user.subscriptionStatus,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId
    })
  } catch (error) {
    console.error('Error fetching user subscription data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

