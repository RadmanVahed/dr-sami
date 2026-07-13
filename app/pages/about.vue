<script setup lang="ts">
import type { AboutPageContent } from '~/components/about/AboutDoctorPage.vue'

const { locale, t } = useI18n()

async function fetchAboutPage(localeCode: string) {
  return await $fetch('/api/content/about', {
    query: { locale: localeCode }
  })
}

const { data: page } = await useAsyncData(
  () => `about-${locale.value}`,
  () => fetchAboutPage(locale.value),
  {
    watch: [locale],
    getCachedData(key, nuxtApp) {
      if (import.meta.server) {
        return
      }
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
    }
  }
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
