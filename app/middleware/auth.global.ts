export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.includes('/dashboard')) {
    return
  }

  const localePath = useLocalePath()
  const requestFetch = useRequestFetch()

  try {
    const session = await requestFetch<{ loggedIn: boolean }>('/api/auth/session')
    if (!session.loggedIn) {
      return navigateTo(localePath('/auth'))
    }
  } catch {
    return navigateTo(localePath('/auth'))
  }
})
