<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const dir = useDir()

const swiperModules = [Pagination, Navigation, Autoplay]

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

const navigationOptions = {
  prevEl: '.landing-blogs__nav-prev',
  nextEl: '.landing-blogs__nav-next'
}

const navPrevLabel = computed(() =>
  locale.value === 'fa' ? 'اسلاید قبلی' : 'Previous slide'
)

const navNextLabel = computed(() =>
  locale.value === 'fa' ? 'اسلاید بعدی' : 'Next slide'
)

const paginationOptions = {
  clickable: true,
  dynamicBullets: true
}

function formattedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <UContainer :dir="dir">
    <div class="landing-blogs__swiper my-12">
      <div
        v-if="$device.isDesktopOrTablet"
        class="landing-blogs__nav mb-8 flex items-center gap-2"
        :class="dir === 'rtl' ? 'justify-end' : 'justify-start'"
      >
        <button
          type="button"
          class="landing-blogs__nav-btn landing-blogs__nav-prev border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :aria-label="navPrevLabel"
        >
          <UIcon
            :name="dir === 'rtl' ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'"
            class="size-4"
          />
        </button>
        <button
          type="button"
          class="landing-blogs__nav-btn landing-blogs__nav-next border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :aria-label="navNextLabel"
        >
          <UIcon
            :name="dir === 'rtl' ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right'"
            class="size-4"
          />
        </button>
      </div>

      <Swiper
        :modules="swiperModules"
        :dir="dir"
        :slides-per-view="$device.isDesktop ? 3 : $device.isTablet ? 2 : 1"
        :space-between="50"
        autoplay
        loop
        :navigation="$device.isDesktopOrTablet ? navigationOptions : false"
        :pagination="paginationOptions"
        class="landing-blogs-swiper"
      >
        <SwiperSlide class="py-4" v-for="(item, index) in blogPosts" :key="index">
          <ClientOnly>
            <UBlogPost
              :title="item.title"
              :description="item.description"
              :image="item.image"
              :date="formattedDate(item.date)"
              :authors="item.authors"
              orientation="vertical"
              class="min-h-[465.25px]"
              :ui="{
                root: 'flex flex-col min-h-[465.25px]',
                description: 'line-clamp-3',
                footer: 'mt-auto pt-4'
              }"
            >
              <template #footer>
                <UButton
                  :label="t('home.sections.blog.cta')"
                  :to="localePath(item.slug)"
                  color="primary"
                  variant="soft"
                  block
                  :trailing-icon="dir === 'rtl' ? 'i-heroicons-arrow-left' : 'i-heroicons-arrow-right'"
                />
              </template>
            </UBlogPost>
          </ClientOnly>
        </SwiperSlide>
      </Swiper>
    </div>
  </UContainer>
</template>

<style scoped>
.landing-blogs__swiper {
  pointer-events: auto;
}

.landing-blogs-swiper :deep(.swiper-pagination) {
  position: relative !important;
  bottom: auto !important;
  margin-top: 1rem;
  width: 100%;
}

.landing-blogs-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: var(--ui-primary);
}

.landing-blogs__nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border-width: 1px;
  border-style: solid;
  color: var(--ui-primary);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
}

.landing-blogs__nav-btn.swiper-button-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.landing-blogs__nav-btn::after {
  display: none;
}

.landing-blogs__swiper :deep(.landing-blogs__nav-btn.swiper-button-prev),
.landing-blogs__swiper :deep(.landing-blogs__nav-btn.swiper-button-next) {
  position: static;
  inset: auto;
  margin: 0;
}
</style>
