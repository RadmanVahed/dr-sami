<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const dir = useDir()
const { getTitle, getDescription } = useLocalizedField()

const { data: posts } = await useFetch('/api/content/posts', {
  query: { section: 'patient' }
})

const swiperModules = [Pagination, Navigation, Autoplay]

const authors = computed(() => [{
  name: t('basic.dr'),
  avatar: { src: '/images/profilePic3.png', alt: 'Doctor' },
  to: localePath('/about')
}])

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
  return new Date(dateString).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
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
        class="landing-blogs__nav mb-8 flex items-center gap-2"
        :class="dir === 'rtl' ? 'justify-end' : 'justify-start'"
      >
        <button
          type="button"
          class="landing-blogs__nav-btn landing-blogs__nav-prev border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :aria-label="navPrevLabel"
        >
          <UIcon
            :name="dir === 'rtl' ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
            class="size-4"
          />
        </button>
        <button
          type="button"
          class="landing-blogs__nav-btn landing-blogs__nav-next border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :aria-label="navNextLabel"
        >
          <UIcon
            :name="dir === 'rtl' ? 'i-lucide-chevron-left' : 'i-lucide-chevron-right'"
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
        :navigation="navigationOptions"
        :pagination="paginationOptions"
        class="landing-blogs-swiper"
      >
        <SwiperSlide v-for="post in (posts || []).slice(0, 4)" :key="post.id" class="py-4">
          <ClientOnly>
            <UBlogPost
              :title="getTitle(post)"
              :description="getDescription(post)"
              :image="post.image ? { src: post.image, alt: getTitle(post) } : undefined"
              :date="formattedDate(post.publishedAt)"
              :authors="authors"
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
                  :to="localePath(`/patient-education/${post.slug}`)"
                  color="primary"
                  variant="soft"
                  block
                  :trailing-icon="dir === 'rtl' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'"
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
