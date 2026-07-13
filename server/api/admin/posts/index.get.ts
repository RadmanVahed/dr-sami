import { eq, and, desc } from 'drizzle-orm'
import { posts, attachments } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const query = getQuery(event)
  const section = query.section as string | undefined

  const db = useDb()
  const conditions = section ? [eq(posts.section, section as 'service' | 'blog' | 'medical' | 'patient')] : []

  const result = await db.select().from(posts)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(posts.publishedAt))

  const withAttachments = await Promise.all(result.map(async (post) => {
    const postAttachments = await db.select().from(attachments).where(eq(attachments.postId, post.id))
    return { ...post, attachments: postAttachments }
  }))

  return withAttachments
})
