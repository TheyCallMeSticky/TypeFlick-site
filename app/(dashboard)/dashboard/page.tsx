import { Suspense } from 'react'
import Link from 'next/link'
import VideoTable from '@/components/dashboard/VideoTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = { title: 'My videos' }

export default function DashboardHome() {
  return (
    <section className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-100">My videos</h1>
        <Link
          href="/videos/new"
          className="inline-flex items-center rounded bg-accent-200 
              hover:bg-accent-100 px-4 py-2 text-white hover:bg-primary/90"
        >
          + New video
        </Link>
      </header>

      <Card className="mb-8">
        <CardContent>
          <Suspense fallback={<p>Loading…</p>}>
            <VideoTable />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  )
}
