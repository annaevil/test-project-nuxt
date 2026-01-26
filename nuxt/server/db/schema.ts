import { pgTable, serial, varchar, integer, text, timestamp, boolean, numeric } from 'drizzle-orm/pg-core'

// Типы спектаклей
export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
})

// Спектакли
export const performances = pgTable('performances', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  duration: integer('duration'), 
  genre_id: integer('genre_id').references(() => genres.id),
  director: varchar('director', { length: 200 }),
  poster: text('poster'),
  age_rating: varchar('age_rating', { length: 10 }),
  is_active: boolean('is_active').default(true),
})

// Сессии (конкретные показы)
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  performance_id: integer('performance_id').references(() => performances.id),
  datetime: timestamp('datetime').notNull(),
  hall: varchar('hall', { length: 100 }).notNull(),
  base_price: numeric('base_price', { precision: 10, scale: 2 }).notNull(),
  available_seats: integer('available_seats').notNull(),
  is_sold_out: boolean('is_sold_out').default(false),
})

// Пользователи — кассиры
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  is_active: boolean('is_active').default(true),
})

// Зрители
export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  patronymic: varchar('patronymic', { length: 100 }),
  email: varchar('email', { length: 255 }),
})

// Билеты
export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  session_id: integer('session_id').references(() => sessions.id),
  guest_id: integer('guest_id').references(() => guests.id),
  user_id: integer('user_id').references(() => users.id),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  row: varchar('row', { length: 10 }),
  seat: varchar('seat', { length: 10 }),
  sold_at: timestamp('sold_at').defaultNow(),
})
