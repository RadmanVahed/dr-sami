import { eq } from 'drizzle-orm'
import { faqs } from '../../../db/schema'
import { faqInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const body = await readBody(event)
  const parsed = faqInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDb()

  const [existing] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'FAQ not found' })
  }

  const [updated] = await db.update(faqs).set({
    categoryId: parsed.data.categoryId,
    questionFa: parsed.data.questionFa,
    questionEn: parsed.data.questionEn,
    answerFa: parsed.data.answerFa,
    answerEn: parsed.data.answerEn,
    sortOrder: parsed.data.sortOrder ?? existing.sortOrder
  }).where(eq(faqs.id, id)).returning()

  return updated
})
