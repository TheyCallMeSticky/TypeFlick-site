import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
})

export const db = drizzle(pool, { schema })

// (Optionnel) helper pour fermer le pool dans les tests
export const closeDb = () => pool.end()
