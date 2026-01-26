import { defineEventHandler } from 'h3'
import { db } from '@server/db'
import { users } from '@server/db/schema'

export default defineEventHandler(async () => {
  return await db.select({
    id: users.id,
    first_name: users.first_name,
    last_name: users.last_name
  }).from(users)
})
