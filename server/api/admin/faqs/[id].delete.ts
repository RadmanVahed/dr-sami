import { eq } from 'drizzle-orm'
import { faqs } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const db = useDb()

  const [existing] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'FAQ not found' })
  }

  await db.delete(faqs).where(eq(faqs.id, id))

  return { success: true }
})
