import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '@server/db'
import { tickets } from '@server/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.session_id || !body.guest_id || !body.user_id || !body.price) {
    throw createError({ statusCode: 400, statusMessage: 'Не хватает данных для билета' })
  }

  const ticket = await db.insert(tickets).values({
    session_id: body.session_id,
    guest_id: body.guest_id,
    user_id: body.user_id,
    price: body.price,
    row: body.row,
    seat: body.seat,
  }).returning()

  return ticket
})
