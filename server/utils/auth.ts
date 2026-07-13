export async function requireAdminSession(event: H3Event) {
  const session = await requireUserSession(event)
  if (!session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session
}
