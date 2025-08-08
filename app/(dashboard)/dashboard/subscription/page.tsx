'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useSWR from 'swr'
import { User } from '@/lib/db/schema'
import { customerPortalAction } from '@/lib/payments/actions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SubscriptionPage() {
  const { data: userData } = useSWR<User>('/api/user/subscription', fetcher)

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium bold text-text-100 mb-6">
        Subscription Management
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">Current Plan: {userData?.planName || 'Free'}</p>
                <p className="text-sm text-muted-foreground">
                  {userData?.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : userData?.subscriptionStatus === 'trialing'
                      ? 'Trial period'
                      : 'No active subscription'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button
                  type="submit"
                  variant="outline"
                  className=" bg-bg-100 border-bg-200 text-text-100"
                >
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
