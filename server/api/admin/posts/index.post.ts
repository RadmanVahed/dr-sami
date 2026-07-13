import { eq } from 'drizzle-orm'
import { posts, attachments } from '../../../db/schema'
import { postInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const body = await readBody(event)
  const parsed = postInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const { attachments: attachmentInputs, ...postData } = parsed.data
  const db = useDb()

  const [inserted] = await db.insert(posts).values({
    section: postData.section,
    slug: postData.slug,
    titleFa: postData.titleFa,
    titleEn: postData.titleEn,
    descriptionFa: postData.descriptionFa,
    descriptionEn: postData.descriptionEn,
    image: postData.image || null,
    videoUrl: postData.videoUrl || null,
    categoryId: postData.categoryId || null,
    publishedAt: postData.publishedAt || new Date().toISOString()
  }).returning()

  if (attachmentInputs?.length) {
    await db.insert(attachments).values(
      attachmentInputs.map(att => ({
        postId: inserted.id,
        titleFa: att.titleFa,
        titleEn: att.titleEn,
        kind: att.kind,
        url: att.url
      }))
    )
  }

  const postAttachments = await db.select().from(attachments).where(eq(attachments.postId, inserted.id))

  return { ...inserted, attachments: postAttachments }
})
