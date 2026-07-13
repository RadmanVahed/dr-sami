import { eq, asc } from 'drizzle-orm'
import { categories } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const section = query.section as string

  if (!section) {
    throw createError({ statusCode: 400, statusMessage: 'Section is required' })
  }

  const db = useDb()
  const result = await db.select().from(categories)
    .where(eq(categories.section, section as 'blog' | 'medical' | 'patient' | 'faq'))
    .orderBy(asc(categories.sortOrder))

  return result
})
