<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const authors = [
  {
    name: t('basic.dr'),
    avatar: {
      src: '/images/profilePic3.png',
      alt: 'تصویر پروفایل دکتر'
    },
    to: localePath('/about')
  }
]
const blogPosts = [
  {
    slug: '/blog/bronchitis-treatment',
    title: t('blog.posts.bronchitis.title'),
    description: t('blog.posts.bronchitis.description'),
    image: {
      src: '/images/blogs/lung-microscopy.png',
      alt: t('blog.posts.bronchitis.imageAlt')
    },
    date: '2025-10-15',
    authors
  },
  {
    slug: '/blog/managing-asthma',
    title: t('blog.posts.asthma.title'),
    description: t('blog.posts.asthma.description'),
    image: {
      src: '/images/blogs/respiratory-spray-noun.png',
      alt: t('blog.posts.asthma.imageAlt')
    },
    date: '2025-10-02',
    authors
  },
  {
    slug: '/blog/long-covid-respiratory-effects',
    title: t('blog.posts.longCovid.title'),
    description: t('blog.posts.longCovid.description'),
    image: {
      src: '/images/blogs/coronavirus.png',
      alt: t('blog.posts.longCovid.imageAlt')
    },
    date: '2025-09-20',
    authors
  },
  {
    slug: '/blog/quitting-smoking-benefits',
    title: t('blog.posts.quittingSmoking.title'),
    description: t('blog.posts.quittingSmoking.description'),
    image: {
      src: '/images/blogs/quitting-smoking.png',
      alt: t('blog.posts.quittingSmoking.imageAlt')
    },
    date: '2025-09-05',
    authors
  }
]
const selectedService = blogPosts.find((i) => i.slug == '/blog/' + route.params.slug)

if (!selectedService) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>
<template>
  <UContainer :dir="useDir().value" class="mt-8">
    <UChangelogVersion :title="selectedService.title" :description="selectedService.description" :indicator="false">
      <template #image>
        <div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe
            src="https://www.aparat.com/video/video/embed/videohash/civ9p18/vt/frame" allowFullScreen="true"
            webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
      </template>
    </UChangelogVersion>
  </UContainer>
</template>
<style scoped>
.h_iframe-aparat_embed_frame {
  position: relative;
}

.h_iframe-aparat_embed_frame .ratio {
  display: block;
  width: 100%;
  height: auto;
}

.h_iframe-aparat_embed_frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
