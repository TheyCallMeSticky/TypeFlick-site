// app/pricing/page.tsx  (ou /app/(marketing)/pricing/page.tsx)
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe'
import { PricingPageClient } from './PricingPageClient'

export const revalidate = 3600 // ISR d’1 h

export default async function PricingPage() {
  const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()])

  // On ne passe QUE des données sérialisables (objets, tableaux, strings, numbers)
  return <PricingPageClient prices={prices} products={products} />
}
