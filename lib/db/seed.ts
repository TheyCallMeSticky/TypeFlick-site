import 'dotenv/config'
import { db } from './drizzle'
import { users, teams, teamMembers, templates } from './schema'
import { hashPassword } from '@/lib/auth/session'

async function createInitialUserAndTeam() {
  const email = 'test@test.com'
  const password = 'admin123'

  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash: await hashPassword(password),
      role: 'owner'
    })
    .returning()

  const [team] = await db.insert(teams).values({ name: 'Test Team' }).returning()

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner'
  })

  console.log(`✅ User ${email} / ${password} created with team "${team.name}"`)
}

async function seedTemplates() {
  await db
    .insert(templates)
    .values([
      {
        id: 1,
        name: 'Water-marked free',
        slug: 'free',
        aspectRatio: '16_9',
        thumbnailUrl: '/thumb/free.png',
        config: {}
      },
      {
        id: 2,
        name: 'Classic Type Beat',
        slug: 'base',
        aspectRatio: '16_9',
        thumbnailUrl: '/thumb/classic.png',
        config: {}
      },
      {
        id: 3,
        name: 'Vinyl',
        slug: 'vinyl',
        aspectRatio: '16_9',
        thumbnailUrl: '/thumb/vinyl.png',
        config: {}
      }
    ])
    .onConflictDoNothing()

  console.log('✅ Templates seeded')
}

async function main() {
  await createInitialUserAndTeam()
  await seedTemplates()
}

main()
  .then(() => {
    console.log('🌱 Seed finished.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
