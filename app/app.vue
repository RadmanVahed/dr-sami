<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const htmlLang = computed(() => locale.value)
const htmlDir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: htmlLang,
    dir: htmlDir
  }
})
useFont()
useSeoMeta({
  titleTemplate: '%s - دکتر رامین سامی',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
})

// const [{ data: navigation }, { data: files }] = await Promise.all([
//   useAsyncData('navigation', () => {
//     return Promise.all([
//       queryCollectionNavigation('blog')
//     ])
//   }, {
//     transform: data => data.flat()
//   }),
//   useLazyAsyncData('search', () => {
//     return Promise.all([
//       queryCollectionSearchSections('blog')
//     ])
//   }, {
//     server: false,
//     transform: data => data.flat()
//   })
// ])
</script>

<template>
  <UApp>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
