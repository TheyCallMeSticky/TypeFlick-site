// app/(login)/auth/page.tsx
import { Suspense } from 'react'
import { EmailFirst } from '@/components/auth/email-first'

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailFirst />
    </Suspense>
  )
}
