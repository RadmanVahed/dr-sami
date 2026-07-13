<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { AboutPageContent } from '~/components/about/AboutDoctorPage.vue'

const { locale, t } = useI18n()

const { data: page } = await useAsyncData(
  `about-${locale.value}`,
  async () => {
    const collection = locale.value as keyof Collections
    return await queryCollection(collection)
      .path(`/${locale.value}/about`)
      .first()
  },
  { watch: [locale] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

type AboutContentDoc = AboutPageContent & {
  seo?: { title?: string, description?: string }
  meta?: Omit<AboutPageContent, 'title' | 'description'>
}

const content = computed((): AboutPageContent | null => {
  const doc = page.value as AboutContentDoc | null
  if (!doc) {
    return null
  }
  const meta = doc.meta ?? {}
  return {
    title: doc.title ?? meta.title ?? '',
    description: doc.description ?? meta.description ?? '',
    ...meta
  } as AboutPageContent
})

useSeoMeta({
  title: () => (page.value as AboutContentDoc)?.seo?.title ?? t('about.pageTitle'),
  description: () => (page.value as AboutContentDoc)?.seo?.description ?? t('about.description'),
  ogTitle: () => (page.value as AboutContentDoc)?.seo?.title ?? t('about.title'),
  ogDescription: () => (page.value as AboutContentDoc)?.seo?.description ?? t('about.description')
})
</script>

<template>
  <div :dir="useDir().value">
    <AboutDoctorPage v-if="content" :content="content" />
  </div>
</template>
