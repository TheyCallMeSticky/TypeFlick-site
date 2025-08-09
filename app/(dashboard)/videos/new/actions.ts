//app/(dashboard)/videos/new/actions.ts
'use server'

import { getUser } from '@/lib/db/queries'
import { User } from '@/lib/db/schema'

export async function getCurrentUser() {
  const user = (await getUser()) as User
  return user
}
