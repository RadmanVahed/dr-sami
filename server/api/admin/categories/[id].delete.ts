import { eq, and, ne } from 'drizzle-orm'
import { categories, posts, faqs } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const db = useDb()

  const [existing] = await db.select().from(categories).where(eq(categories.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  const newParentId = existing.parentId

  await db.update(categories)
    .set({ parentId: newParentId })
    .where(eq(categories.parentId, id))

  if (existing.section === 'faq') {
    if (newParentId) {
      await db.update(faqs)
        .set({ categoryId: newParentId })
        .where(eq(faqs.categoryId, id))
    } else {
      const siblings = await db.select().from(categories)
        .where(and(eq(categories.section, 'faq'), ne(categories.id, id)))
        .limit(1)

      if (siblings.length > 0) {
        await db.update(faqs)
          .set({ categoryId: siblings[0].id })
          .where(eq(faqs.categoryId, id))
      } else {
        await db.delete(faqs).where(eq(faqs.categoryId, id))
      }
    }
  } else {
    await db.update(posts)
      .set({ categoryId: newParentId })
      .where(eq(posts.categoryId, id))
  }

  await db.delete(categories).where(eq(categories.id, id))

  return { success: true, movedToParentId: newParentId }
})
