<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { withLeadingSlash } from 'ufo'
import type { ButtonProps, PageCardProps, PageGridProps } from '@nuxt/ui'
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

const links = ref<ButtonProps[]>([
  {
    label: 'اطلاعات بیشتر و رزرو نوبت',
    color: 'neutral'
  }
])

const authors = ref([
  {
    name: 'دکتر رامین سامی',
    description: 'فوق تخصص ریه',
    avatar: {
      src: 'https://imgcdn.stablediffusionweb.com/2024/10/29/a450d65f-b789-416c-945a-4f2d19a15d23.jpg'
    },
    target: '_blank'
  }
])

</script>

<template>
  <UPage v-if="page" :dir="useDir().value">
    <UPageSection id="page-top-sentinel">
      <LandingHero :dir="useDir().value" :page />
    </UPageSection>
    <UPageSection id="services" title="خدمات تخصصی"
      description="ما طیف وسیعی از خدمات تشخیصی و درمانی را برای انواع بیماری‌های ریوی و تنفسی با بهره‌گیری از دانش روز و تجهیزات مدرن ارائه می‌دهیم."
      :ui="{
        container: 'w-full',
        title: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center',
        description: 'mt-4 text-lg text-gray-500 dark:text-gray-400 text-center'
      }">
      <LandingServices />
    </UPageSection>
    <UPageSection title="نوبت دهی اینترنتی" id="appointment" :ui="{ container: '!pt-0 w-full' }">
      <LandingAppointments />
    </UPageSection>
    <UPageSection id="blog" title="اموزش بیماران"
      description="با مطالعه مقالات علمی و به‌روز، اطلاعات خود را در زمینه سلامت ریه و بیماری‌های تنفسی افزایش دهید.">
      <LandingBlogs />
    </UPageSection>
    <!-- <LandingBlog :page /> -->
    <!-- <LandingTestimonials :data /> -->
    <LandingFAQ :page />
  </UPage>
</template>
