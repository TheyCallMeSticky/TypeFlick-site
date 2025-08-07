import Link from 'next/link'
import { TypeFlickLogoBottomText } from '@/components/ui/logo'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <TypeFlickLogoBottomText className="h-20" />
        </div>
        <h1 className="text-4xl font-bold text-accent-100 tracking-tight">Page Not Found</h1>
        <p className="text-base text-text-100">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-bg-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
