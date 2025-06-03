// scripts/seedTemplates.ts
import { db } from '@/lib/db'
import { templates } from '@/lib/db/schema'
;(async () => {
  await db
    .insert(templates)
    .values([
      {
        id: 1, // keep fixed IDs
        name: 'Water-marked free',
        slug: 'water-marked-free',
        aspectRatio: '16_9',
        thumbnailUrl: '/thumb/free.png',
        config: {}
      },
      {
        id: 2,
        name: 'Classic Type Beat',
        slug: 'classic-type-beat',
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
  process.exit(0)
})()
