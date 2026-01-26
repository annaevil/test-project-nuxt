import { defineEventHandler } from 'h3'
import { db } from '@server/db'
import { sessions, performances } from '@server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return await db.select({
    id: sessions.id,
    title: performances.title,
    datetime: sessions.datetime
  })
  .from(sessions)
  .leftJoin(performances, eq(sessions.performance_id, performances.id))
})
