import { faqs } from '../../../db/schema'
import { faqInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const body = await readBody(event)
  const parsed = faqInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDb()
  const [inserted] = await db.insert(faqs).values({
    categoryId: parsed.data.categoryId,
    questionFa: parsed.data.questionFa,
    questionEn: parsed.data.questionEn,
    answerFa: parsed.data.answerFa,
    answerEn: parsed.data.answerEn,
    sortOrder: parsed.data.sortOrder ?? 0
  }).returning()

  return inserted
})
