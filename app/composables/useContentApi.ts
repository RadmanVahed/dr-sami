import type { Post, Category, FaqCategory, PostSection, CategorySection } from '~/types/content'

export function useLocalizedField() {
  const { locale } = useI18n()

  function getTitle(item: { titleFa: string, titleEn: string }) {
    return locale.value === 'fa' ? item.titleFa : item.titleEn
  }

  function getDescription(item: { descriptionFa: string, descriptionEn: string }) {
    return locale.value === 'fa' ? item.descriptionFa : item.descriptionEn
  }

  function getName(item: { nameFa: string, nameEn: string }) {
    return locale.value === 'fa' ? item.nameFa : item.nameEn
  }

  function getQuestion(item: { questionFa: string, questionEn: string }) {
    return locale.value === 'fa' ? item.questionFa : item.questionEn
  }

  function getAnswer(item: { answerFa: string, answerEn: string }) {
    return locale.value === 'fa' ? item.answerFa : item.answerEn
  }

  function getAttachmentTitle(item: { titleFa: string, titleEn: string }) {
    return locale.value === 'fa' ? item.titleFa : item.titleEn
  }

  return { getTitle, getDescription, getName, getQuestion, getAnswer, getAttachmentTitle }
}

export function useContentApi() {
  function fetchPosts(section?: PostSection, categoryId?: number, categorySlug?: string) {
    return useFetch<Post[]>('/api/content/posts', {
      query: {
        ...(section ? { section } : {}),
        ...(categoryId ? { category: categoryId } : {}),
        ...(categorySlug ? { categorySlug } : {})
      }
    })
  }

  function fetchPost(slug: string) {
    return useFetch<Post>(`/api/content/posts/${slug}`)
  }

  function fetchCategories(section: CategorySection) {
    return useFetch<Category[]>('/api/content/categories', {
      query: { section }
    })
  }

  function fetchFaqs() {
    return useFetch<FaqCategory[]>('/api/content/faqs')
  }

  return { fetchPosts, fetchPost, fetchCategories, fetchFaqs }
}
