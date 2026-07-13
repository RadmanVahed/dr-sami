import { categories } from '../../../db/schema'
import { categoryInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const body = await readBody(event)
  const parsed = categoryInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDb()
  const [inserted] = await db.insert(categories).values({
    section: parsed.data.section,
    parentId: parsed.data.parentId || null,
    nameFa: parsed.data.nameFa,
    nameEn: parsed.data.nameEn,
    slug: parsed.data.slug,
    sortOrder: parsed.data.sortOrder ?? 0
  }).returning()

  return inserted
})
