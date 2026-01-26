// server/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { genres, performances, sessions, users, guests, tickets } from './schema'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema: { genres, performances, sessions, users, guests, tickets } })

export { genres, performances, sessions, users, guests, tickets }
