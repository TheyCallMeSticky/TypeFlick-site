'use client'
import { checkoutAction } from '@/lib/payments/actions'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/ui/submitButton'

type Props = {
  name: string
  price: number
  interval: string
  trialDays: number
  features: string[]
  priceId?: string
  disabled?: boolean
  /** Mettre true pour le plan “mis en avant” */
  recommended?: boolean
}

export function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  disabled,
  recommended
}: Props) {
  return (
    <div
      className={`relative p-6 rounded-3xl
        ${recommended ? 'border-2 border-accent-100 shadow-lg' : 'border border-bg-300'}
      `}
    >
      {/* Badge “Recommended” */}
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold rounded-full bg-bg-200 border border-accent-100 text-accent-100">
          Recommended
        </span>
      )}

      {/* Nom du plan */}
      <h2
        className={`text-3xl font-bold mb-2 
          ${recommended ? 'text-accent-100' : 'text-accent-100'}
        `}
      >
        {name}
      </h2>

      {/* Prix */}
      <p
        className={`text-4xl font-medium mb-6
          ${recommended ? 'text-accent-100' : 'text-accent-100'}
        `}
      >
        ${price / 100} <span className="text-xl font-normal text-text-200">/ {interval}</span>
      </p>

      {/* Liste des features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <Check className="h-5 w-5 text-primary-100 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-primary-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {disabled ? (
        <Button disabled variant="outline" className="w-full rounded-full cursor-not-allowed">
          Coming soon
        </Button>
      ) : (
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          {/* On passe recommended pour pouvoir styliser le bouton */}
          <SubmitButton recommended={recommended} />
        </form>
      )}
    </div>
  )
}
