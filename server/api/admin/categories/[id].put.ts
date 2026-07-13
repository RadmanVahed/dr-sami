import { eq } from 'drizzle-orm'
import { categories } from '../../../db/schema'
import { categoryInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const body = await readBody(event)
  const parsed = categoryInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDb()

  const [existing] = await db.select().from(categories).where(eq(categories.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  const [updated] = await db.update(categories).set({
    section: parsed.data.section,
    parentId: parsed.data.parentId || null,
    nameFa: parsed.data.nameFa,
    nameEn: parsed.data.nameEn,
    slug: parsed.data.slug,
    sortOrder: parsed.data.sortOrder ?? existing.sortOrder
  }).where(eq(categories.id, id)).returning()

  return updated
})
