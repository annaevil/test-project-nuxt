import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '@server/db'
import { performances } from '@server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.id) {
    throw createError({ statusCode: 400, statusMessage: 'Не указан id спектакля' })
  }

  const updated = await db.update(performances)
    .set({
      title: body.title,
      description: body.description,
      duration: body.duration,
    })
    .where(eq(performances.id, body.id))
    .returning()

  return updated
})
