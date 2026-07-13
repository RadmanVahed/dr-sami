import { eq } from 'drizzle-orm'
import { posts, attachments } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const db = useDb()

  const [existing] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  await db.delete(attachments).where(eq(attachments.postId, id))
  await db.delete(posts).where(eq(posts.id, id))

  return { success: true }
})
