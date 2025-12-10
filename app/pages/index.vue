<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { withLeadingSlash } from 'ufo'
import type { ButtonProps } from '@nuxt/ui'

const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => withLeadingSlash(String(locale.value)))

const { data: page } = await useAsyncData('page-' + locale.value, async () => {
  const l = locale.value as keyof Collections
  const content = await queryCollection(l).path(`/${l}/`).first()
  return content
}, { watch: [locale] })

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})

const links = ref<ButtonProps[]>([
  {
    label: t('home.hero.button'),
    color: 'neutral'
  }
])

const authors = ref([
  {
    name: t('home.hero.author.name'),
    description: t('home.hero.author.description'),
    avatar: {
      src: 'https://imgcdn.stablediffusionweb.com/2024/10/29/a450d65f-b789-416c-945a-4f2d19a15d23.jpg'
    },
    target: '_blank'
  }
])
</script>

<template>
  <UPage v-if="page" :dir="useDir().value">
    <LandingHero :dir="useDir().value" :page />
    <UPageSection id="services" :title="t('home.sections.services.title')"
      :description="t('home.sections.services.description')" :ui="{
        container: 'w-full !gap-0',
        title: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center',
        description: 'mt-4 text-lg text-gray-500 dark:text-gray-400 text-center'
      }">
      <LandingServices />
    </UPageSection>

    <UPageSection :title="t('home.sections.appointment.title')" id="appointment" :ui="{ container: '!pt-0 w-full' }">
      <LandingAppointments />
    </UPageSection>

    <UPageSection
      id="blog"
      :title="t('home.sections.blog.title')"
      :description="t('home.sections.blog.description')"
      :ui="{
        container: 'w-full !gap-0',
        title: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center',
        description: 'mt-4 text-lg text-gray-500 dark:text-gray-400 text-center'
      }"
    >
      <LandingBlogs />
    </UPageSection>

    <!-- FAQ Section -->
    <LandingFAQ :page />
  </UPage>
</template>
