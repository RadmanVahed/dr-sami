import { eq, and, asc } from 'drizzle-orm'
import { categories } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const query = getQuery(event)
  const section = query.section as string | undefined

  const db = useDb()
  const conditions = section ? [eq(categories.section, section as 'blog' | 'medical' | 'patient' | 'faq')] : []

  const result = await db.select().from(categories)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(categories.sortOrder))

  return result
})
