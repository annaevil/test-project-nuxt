import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '@server/db'
import { tickets, sessions, users } from '@server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { sessionId, userId, price } = body

  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId))
  if (!session.length) throw createError({ statusCode: 404, statusMessage: 'Сессия не найдена' })

  const user = await db.select().from(users).where(eq(users.id, userId))
  if (!user.length) throw createError({ statusCode: 404, statusMessage: 'Зритель не найден' })

  const [ticket] = await db.insert(tickets).values({
    session_id: sessionId,
    user_id: userId,
    price: price
  }).returning()

  return { success: true, ticket }
})
