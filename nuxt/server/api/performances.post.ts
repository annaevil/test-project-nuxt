import { db } from '../db'
import { performances } from '../db/schema'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await db
    .insert(performances)
    .values({
      title: body.title,
      description: body.description,
      duration: body.duration,
      age_rating: body.age_rating,
      director: body.director,
      poster: body.poster,
      genre_id: body.genre_id,
      is_active: true,
    })
    .returning()

  return result
})
