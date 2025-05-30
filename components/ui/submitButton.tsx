'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type Props = { recommended?: boolean }

export function SubmitButton({ recommended }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      /** Accent si recommended, sinon outline */
      className={`w-full rounded-full
        ${
          recommended
            ? 'bg-accent-100 text-bg-100 hover:bg-accent-100/90 '
            : 'border text-text-200 hover:bg-primary-100 hover:text-white'
        }`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading…
        </>
      ) : (
        <>
          Get started
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}
