<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { withLeadingSlash } from 'ufo'
const route = useRoute()
const { locale, localeProperties } = useI18n()
const slug = computed(() => withLeadingSlash(String(locale.value)))

const { data: page } = await useAsyncData('page-' + locale.value, async () => {
  const l = locale.value as keyof Collections
  const content = await queryCollection(l).path(`/${l}/`).first()
  return content
}, {
  watch: [locale],
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page" :dir="useDir()">
    <LandingHero :dir="useDir()" :page />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <!-- <LandingBlog :page /> -->
    <!-- <LandingTestimonials :page /> -->
    <LandingFAQ :page />
  </UPage>
</template>
