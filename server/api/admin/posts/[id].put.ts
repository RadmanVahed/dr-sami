import { eq } from 'drizzle-orm'
import { posts, attachments } from '../../../db/schema'
import { postInputSchema } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const body = await readBody(event)
  const parsed = postInputSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const { attachments: attachmentInputs, ...postData } = parsed.data
  const db = useDb()

  const [existing] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const [updated] = await db.update(posts).set({
    section: postData.section,
    slug: postData.slug,
    titleFa: postData.titleFa,
    titleEn: postData.titleEn,
    descriptionFa: postData.descriptionFa,
    descriptionEn: postData.descriptionEn,
    image: postData.image || null,
    videoUrl: postData.videoUrl || null,
    categoryId: postData.categoryId || null,
    publishedAt: postData.publishedAt || existing.publishedAt,
    updatedAt: new Date().toISOString()
  }).where(eq(posts.id, id)).returning()

  await db.delete(attachments).where(eq(attachments.postId, id))

  if (attachmentInputs?.length) {
    await db.insert(attachments).values(
      attachmentInputs.map(att => ({
        postId: id,
        titleFa: att.titleFa,
        titleEn: att.titleEn,
        kind: att.kind,
        url: att.url
      }))
    )
  }

  const postAttachments = await db.select().from(attachments).where(eq(attachments.postId, id))

  return { ...updated, attachments: postAttachments }
})
