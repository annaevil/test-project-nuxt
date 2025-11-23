import { pgTable, serial, text, timestamp, integer, boolean, varchar } from 'drizzle-orm/pg-core'

// 1. Таблица ролей (самая первая)
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
})

// 2. Таблица пользователей
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  roleId: integer('role_id').references(() => roles.id),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

// 3. Таблица жанров
export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
})

// 4. Таблица представлений
export const performances = pgTable('performances', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  duration: integer('duration'), // в минутах
  ageRating: varchar('age_rating', { length: 10 }),
  genreId: integer('genre_id').references(() => genres.id),
  director: varchar('director', { length: 200 }),
  poster: text('poster'), // URL картинки
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

// 5. Таблица сеансов
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  performanceId: integer('performance_id').references(() => performances.id),
  datetime: timestamp('datetime').notNull(),
  hall: varchar('hall', { length: 100 }).notNull(),
  basePrice: integer('base_price').notNull(),
  availableSeats: integer('available_seats').notNull(),
  isSoldOut: boolean('is_sold_out').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
