export interface ServiceItem {
  key: string
  slug: string
  to: string
  image: string
}

export function useServices() {
  const { data: posts } = useFetch('/api/content/posts', {
    query: { section: 'service' }
  })

  const services = computed<ServiceItem[]>(() => {
    if (!posts.value) return []
    return posts.value.map(post => ({
      key: post.slug,
      slug: post.slug,
      to: `/service/${post.slug}`,
      image: post.image || '/images/services/consultation.png'
    }))
  })

  function findBySlug(slug: string) {
    return posts.value?.find(post => post.slug === slug) || null
  }

  return { services, findBySlug, posts }
}
