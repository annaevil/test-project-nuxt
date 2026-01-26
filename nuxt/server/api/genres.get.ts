import { db } from '../db' 
import { genres } from '../db/schema'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  return await db.select().from(genres)
})
