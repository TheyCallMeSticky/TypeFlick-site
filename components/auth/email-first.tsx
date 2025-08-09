// components/auth/email-first.tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlainInput } from '@/components/ui/plain-input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowRight } from 'lucide-react'
import { TypeFlickLogoNoText } from '@/components/ui/logo'
import { useEmailCheck } from '@/hooks/use-email-check'

export function EmailFirst() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { checkEmail, isLoading } = useEmailCheck()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Préserver les paramètres de redirection
  const redirect = searchParams.get('redirect')
  const priceId = searchParams.get('priceId')
  const inviteId = searchParams.get('inviteId')

  const buildRedirectUrl = (path: string) => {
    const params = new URLSearchParams()
    params.set('email', email)
    if (redirect) params.set('redirect', redirect)
    if (priceId) params.set('priceId', priceId)
    if (inviteId) params.set('inviteId', inviteId)

    return `${path}?${params.toString()}`
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length >= 3 && email.length <= 255
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      const result = await checkEmail(email)

      if (result.exists) {
        // Email existe → redirection vers login avec email pré-rempli
        router.push(buildRedirectUrl('/sign-in'))
      } else {
        // Email n'existe pas → redirection vers signup avec email pré-rempli
        router.push(buildRedirectUrl('/sign-up'))
      }
    } catch (error) {
      setEmailError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <TypeFlickLogoNoText className="h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-100">
          Welcome to TypeFlick
        </h2>
        <p className="mt-2 text-center text-sm text-text-200">Enter your email to get started</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-accent-200">
              Email address
            </Label>
            <div className="mt-1">
              <PlainInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                autoFocus
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-200 text-accent-100 focus:outline-none focus:ring-primary-200 focus:border-primary-200 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center 
              py-2 px-4 border border-transparent rounded-full 
              shadow-sm text-sm font-medium text-white 
              bg-accent-200 
              hover:bg-accent-100
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-primary-100
              disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Checking...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Liens légaux en bas de page */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-text-300">
            <Link href="/legal/mentions-legales" className="hover:text-text-200 transition-colors">
              Mentions légales
            </Link>
            <Link
              href="/legal/politique-confidentialite"
              className="hover:text-text-200 transition-colors"
            >
              Confidentialité
            </Link>
            <Link href="/legal/politique-cookies" className="hover:text-text-200 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
