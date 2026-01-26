import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const users = [
    { email: 'admin@theater.com', password: '123', role: 'admin', name: 'Админ' },
    { email: 'cashier@theater.com', password: '123', role: 'cashier', name: 'Кассир' },
  ]

  const user = users.find(u => u.email === body.email && u.password === body.password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }

  return { email: user.email, role: user.role, name: user.name }
})
