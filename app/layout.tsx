import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { getUser } from '@/lib/db/queries'
import { SWRConfig } from 'swr'
import { CookieBanner } from '@/components/ui/cookie-banner'

export const metadata: Metadata = {
  title: 'TypeFlick',
  description: 'Genérate your type beat video and seo easy and fast'
}

export const viewport: Viewport = {
  maximumScale: 1
}

const manrope = Manrope({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-bg-100 ${manrope.className} text-text-100`}>
      <body className="min-h-[100dvh] bg-bg-100">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser()
            }
          }}
        >
          {children}
          <CookieBanner />
        </SWRConfig>
      </body>
    </html>
  )
}
