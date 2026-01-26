import { defineEventHandler } from 'h3'
import { db } from '@server/db'
import { tickets, sessions, performances, users, guests } from '@server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select({
    ticket_id: tickets.id,
    performance: performances.title,
    session_datetime: sessions.datetime,
    guest: guests.first_name,
    cashier: users.first_name,
    price: tickets.price,
    row: tickets.row,
    seat: tickets.seat,
    sold_at: tickets.sold_at,
  })
  .from(tickets)
  .leftJoin(sessions, eq(tickets.session_id, sessions.id))
  .leftJoin(performances, eq(sessions.performance_id, performances.id))
  .leftJoin(users, eq(tickets.user_id, users.id))
  .leftJoin(guests, eq(tickets.guest_id, guests.id))
})
