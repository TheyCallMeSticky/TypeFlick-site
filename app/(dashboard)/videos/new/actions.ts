'use server'

import { getUser, getUserWithTeam } from '@/lib/db/queries'
import { User } from '@/lib/db/schema'

export async function getUwT() {
  const user = (await getUser()) as User
  const userWithTeam = await getUserWithTeam(user.id)
  return userWithTeam
}
