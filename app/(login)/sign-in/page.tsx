// app/(login)/sign-in/page.tsx
import { Suspense } from 'react'
import { Login } from '../login'

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login mode="signin" />
    </Suspense>
  )
}
