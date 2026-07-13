import { eq, and, desc } from 'drizzle-orm'
import { posts, attachments, categories } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const section = query.section as string | undefined
  const categoryId = query.category ? Number(query.category) : undefined
  const categorySlug = query.categorySlug as string | undefined

  const db = useDb()
  const conditions = []

  if (section) {
    conditions.push(eq(posts.section, section as 'service' | 'blog' | 'medical' | 'patient'))
  }

  if (categoryId) {
    conditions.push(eq(posts.categoryId, categoryId))
  } else if (categorySlug && section) {
    const [cat] = await db.select().from(categories)
      .where(and(eq(categories.slug, categorySlug), eq(categories.section, section as 'blog' | 'medical' | 'patient')))
      .limit(1)
    if (cat) {
      conditions.push(eq(posts.categoryId, cat.id))
    }
  }

  const result = await db.select().from(posts)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(posts.publishedAt))

  return result.map(post => ({
    ...post,
    attachments: []
  }))
})
