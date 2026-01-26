// server/api/performances.get.ts
import { defineEventHandler } from 'h3'
import { db, performances } from '@server/db/'

export default defineEventHandler(async () => {
  return await db.select().from(performances)
})
