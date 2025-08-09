// app/(login)/login.tsx
'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlainInput } from '@/components/ui/plain-input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, ArrowLeft } from 'lucide-react'
import { signIn, signUp } from './actions'
import { ActionState } from '@/lib/auth/middleware'
import { TypeFlickLogoNoText } from '@/components/ui/logo'

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const priceId = searchParams.get('priceId')
  const inviteId = searchParams.get('inviteId')
  const prefilledEmail = searchParams.get('email')

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  )

  // État pour l'email si pré-rempli
  const [email, setEmail] = useState(prefilledEmail || state.email || '')

  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail)
    }
  }, [prefilledEmail])

  const buildBackUrl = () => {
    const params = new URLSearchParams()
    if (redirect) params.set('redirect', redirect)
    if (priceId) params.set('priceId', priceId)
    if (inviteId) params.set('inviteId', inviteId)

    const query = params.toString()
    return `/auth${query ? `?${query}` : ''}`
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <TypeFlickLogoNoText className="h-12" />
        </div>

        {/* Breadcrumb / Back button */}
        <div className="mt-4 flex items-center justify-center">
          <Link
            href={buildBackUrl()}
            className="flex items-center text-sm text-text-200 hover:text-text-100 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to email
          </Link>
        </div>

        <h2 className="mt-4 text-center text-3xl font-extrabold text-primary-100">
          {mode === 'signin' ? 'Welcome back!' : 'Create your account'}
        </h2>

        {prefilledEmail && (
          <p className="mt-2 text-center text-sm text-text-200">
            {mode === 'signin'
              ? `Sign in to ${prefilledEmail}`
              : `Complete your account setup for ${prefilledEmail}`}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action={formAction}>
          <input type="hidden" name="redirect" value={redirect || ''} />
          <input type="hidden" name="priceId" value={priceId || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-accent-200">
              Email
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
                maxLength={50}
                readOnly={!!prefilledEmail}
                className={`appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-200 text-accent-100 focus:outline-none focus:ring-primary-200 focus:border-primary-200 focus:z-10 sm:text-sm ${
                  prefilledEmail ? 'bg-gray-50' : ''
                }`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-accent-200">
              Password
            </Label>
            <div className="mt-1">
              <PlainInput
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                autoFocus
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-200 text-accent-100 focus:outline-none focus:ring-primary-100 focus:border-primary-100 focus:z-10 sm:text-sm"
                placeholder={
                  mode === 'signin' ? 'Enter your password' : 'Create a password (8+ characters)'
                }
              />
            </div>
          </div>

          {/* Opt-in RGPD pour l'inscription uniquement */}
          {mode === 'signup' && (
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="text-sm font-medium text-accent-200 mb-3">
                Acceptation des conditions (obligatoire)
              </div>

              {/* Acceptation des CGU */}
              <div className="flex items-start space-x-3">
                <Checkbox id="accept_terms" name="accept_terms" required className="mt-1" />
                <Label htmlFor="accept_terms" className="text-sm text-text-200 leading-5">
                  J'accepte les{' '}
                  <Link
                    href="/legal/conditions-generales-utilisation"
                    target="_blank"
                    className="text-primary-100 hover:text-primary-200 underline"
                  >
                    Conditions Générales d'Utilisation
                  </Link>{' '}
                  et les{' '}
                  <Link
                    href="/legal/conditions-generales-vente"
                    target="_blank"
                    className="text-primary-100 hover:text-primary-200 underline"
                  >
                    Conditions Générales de Vente
                  </Link>
                </Label>
              </div>

              {/* Consentement RGPD */}
              <div className="flex items-start space-x-3">
                <Checkbox id="accept_privacy" name="accept_privacy" required className="mt-1" />
                <Label htmlFor="accept_privacy" className="text-sm text-text-200 leading-5">
                  J'accepte le traitement de mes données personnelles conformément à la{' '}
                  <Link
                    href="/legal/politique-confidentialite"
                    target="_blank"
                    className="text-primary-100 hover:text-primary-200 underline"
                  >
                    Politique de confidentialité
                  </Link>
                </Label>
              </div>

              {/* Consentement marketing (optionnel) */}
              <div className="flex items-start space-x-3">
                <Checkbox id="accept_marketing" name="accept_marketing" className="mt-1" />
                <Label htmlFor="accept_marketing" className="text-sm text-text-200 leading-5">
                  J'accepte de recevoir des communications marketing par email (optionnel)
                </Label>
              </div>

              <div className="text-xs text-text-300 mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="mb-2">
                  <strong>Vos droits :</strong> Vous disposez d'un droit d'accès, de rectification,
                  de suppression et d'opposition au traitement de vos données personnelles.
                </p>
                <p>
                  Pour exercer ces droits, consultez notre{' '}
                  <Link
                    href="/legal/politique-confidentialite"
                    target="_blank"
                    className="text-primary-100 hover:text-primary-200 underline"
                  >
                    Politique de confidentialité
                  </Link>{' '}
                  ou contactez-nous directement.
                </p>
              </div>
            </div>
          )}

          {state?.error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {state.error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center 
              py-2 px-4 border border-transparent rounded-full 
              shadow-sm text-sm font-medium text-white 
              bg-accent-200 
              hover:bg-accent-100
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-primary-100"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : mode === 'signin' ? (
                'Sign in'
              ) : (
                'Create account'
              )}
            </Button>
          </div>
        </form>

        {/* Alternative action */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-bg-100 text-text-200">
                {mode === 'signin' ? 'Need an account?' : 'Already have an account?'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                email ? `?email=${encodeURIComponent(email)}` : ''
              }${redirect ? `${email ? '&' : '?'}redirect=${redirect}` : ''}${
                priceId ? `${email || redirect ? '&' : '?'}priceId=${priceId}` : ''
              }`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
            >
              {mode === 'signin' ? 'Create an account' : 'Sign in to existing account'}
            </Link>
          </div>
        </div>

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
