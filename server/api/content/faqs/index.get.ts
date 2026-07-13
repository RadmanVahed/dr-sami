import { eq, asc } from 'drizzle-orm'
import { categories, faqs } from '../../../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()

  const faqCategories = await db.select().from(categories)
    .where(eq(categories.section, 'faq'))
    .orderBy(asc(categories.sortOrder))

  const result = []
  for (const category of faqCategories) {
    const categoryFaqs = await db.select().from(faqs)
      .where(eq(faqs.categoryId, category.id))
      .orderBy(asc(faqs.sortOrder))

    result.push({
      ...category,
      questions: categoryFaqs
    })
  }

  return result
})
