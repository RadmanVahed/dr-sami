import { eq, and, asc } from 'drizzle-orm'
import { faqs } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const query = getQuery(event)
  const categoryId = query.categoryId ? Number(query.categoryId) : undefined

  const db = useDb()
  const conditions = categoryId ? [eq(faqs.categoryId, categoryId)] : []

  const result = await db.select().from(faqs)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(faqs.sortOrder))

  return result
})
