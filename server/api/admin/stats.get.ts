import { eq, count } from 'drizzle-orm'
import { posts, categories, faqs } from '../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const db = useDb()

  const [services] = await db.select({ count: count() }).from(posts).where(eq(posts.section, 'service'))
  const [blogs] = await db.select({ count: count() }).from(posts).where(eq(posts.section, 'blog'))
  const [medical] = await db.select({ count: count() }).from(posts).where(eq(posts.section, 'medical'))
  const [patient] = await db.select({ count: count() }).from(posts).where(eq(posts.section, 'patient'))
  const [faqCount] = await db.select({ count: count() }).from(faqs)
  const [categoryCount] = await db.select({ count: count() }).from(categories)

  return {
    services: services.count,
    blogs: blogs.count,
    medical: medical.count,
    patient: patient.count,
    faqs: faqCount.count,
    categories: categoryCount.count
  }
})
