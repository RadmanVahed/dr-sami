import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import { loginSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
  }

  const db = useDb()
  const [user] = await db.select().from(users).where(eq(users.username, parsed.data.username)).limit(1)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid username or password' })
  }

  const valid = await verifyPassword(user.passwordHash, parsed.data.password)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid username or password' })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      username: user.username
    }
  })

  return { success: true, user: { id: user.id, username: user.username } }
})
