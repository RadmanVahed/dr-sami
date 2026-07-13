import { eq } from 'drizzle-orm'
import { posts, attachments } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const db = useDb()
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const postAttachments = await db.select().from(attachments).where(eq(attachments.postId, post.id))

  return {
    ...post,
    attachments: postAttachments
  }
})
