<script setup lang="ts">
const dir = useDir().value
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
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

function formattedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
<template>
  <UContainer :dir="useDir().value">
    <Swiper :modules="[Pagination, Navigation, Autoplay]"
      :slides-per-view="$device.isDesktop ? 3 : $device.isTablet ? 2 : 1" :space-between="50" autoplay loop
      :navigation="$device.isDesktopOrTablet" :pagination="{ clickable: true, dynamicBullets: true }" class="my-12">
      <SwiperSlide class="py-4" v-for="(item, index) in blogPosts" :key="index">
        <ClientOnly>
          <UBlogPost :to="localePath(item.slug)" :title="item.title" :description="item.description" :image="item.image"
            :date="formattedDate(item.date)" :authors="item.authors" orientation="vertical" :ui="{
              description: 'line-clamp-3'
            }" class="min-h-[465.25px]" />
        </ClientOnly>
      </SwiperSlide>
    </Swiper>
  </UContainer>
</template>
