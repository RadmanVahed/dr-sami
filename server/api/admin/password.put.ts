import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import { passwordChangeSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const session = await requireAdminSession(event)

  const body = await readBody(event)
  const parsed = passwordChangeSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDb()
  const userId = (session.user as { id: number }).id

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const valid = await verifyPassword(user.passwordHash, parsed.data.currentPassword)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Current password is incorrect' })
  }

  const newHash = await hashPassword(parsed.data.newPassword)
  await db.update(users).set({ passwordHash: newHash }).where(eq(users.id, userId))

  return { success: true }
})
