// app/pricing/PricingPageClient.tsx
'use client'

import { useState } from 'react'
import { IntervalSelector } from '@/components/ui/intervalSelector'
import { PricingCard } from '@/components/ui/pricingCard' // ou où tu l’as mis
import type { Price, Product } from '@/app/types/billing'
type Props = {
  prices: Price[]
  products: Product[]
}

export function PricingPageClient({ prices, products }: Props) {
  const [interval, setInterval] = useState<'week' | 'month' | 'year'>('month')

  // Trouve un price par produit ET par interval
  const findPrice = (prodName: string) =>
    prices.find(
      (p) =>
        products.find((pr) => pr.id === p.productId)?.name === prodName && p?.interval === interval
    )

  const freePrice = findPrice('Free')
  const basePrice = findPrice('Base')
  const proPrice = findPrice('Pro')

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-center gap-4 mb-8">
        <IntervalSelector onChange={setInterval} defaultValue="month" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-xxl mx-auto">
        <PricingCard
          name={'Free'}
          price={freePrice?.unitAmount || 0}
          interval={interval}
          trialDays={0}
          features={[
            'Generate 3 video formats (16:9, 1:1, 9:16)',
            'Watermarked videos',
            'SEO: title & description only'
          ]}
          priceId={freePrice?.id}
        />

        <PricingCard
          name={'Base'}
          price={basePrice?.unitAmount || 7900}
          interval={interval}
          trialDays={0}
          features={[
            'No watermark',
            'Access to all video templates',
            'Full SEO: title, description, tags'
          ]}
          priceId={basePrice?.id}
          recommended
        />
        <PricingCard
          name={'Plus'}
          price={proPrice?.unitAmount || 29900}
          interval={interval}
          trialDays={0}
          features={[
            'Everything in Base, plus:',
            'Automatic publishing to socials',
            'Video history saved',
            'Type Beat artist automatic'
          ]}
          priceId={proPrice?.id}
          disabled
        />
      </div>
    </main>
  )
}
