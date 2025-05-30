export type Price = {
  id: string
  productId: string
  unitAmount: number | null
  currency: string
  interval: 'day' | 'week' | 'month' | 'year' | null | undefined
  trialPeriodDays: number | null | undefined
}

export type Product = {
  id: string
  name: string
  description: string | null | undefined
  defaultPriceId: string | null | undefined
}
