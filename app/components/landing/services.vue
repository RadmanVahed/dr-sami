<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const dir = useDir()
const { getTitle, getDescription } = useLocalizedField()

const { posts } = useServices()

const swiperModules = [Pagination, Navigation, Autoplay]

const navigationOptions = {
  prevEl: '.landing-services__nav-prev',
  nextEl: '.landing-services__nav-next'
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

const swiperBreakpoints = {
  0: { slidesPerView: 1.15, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 24 }
}
</script>

<template>
  <UContainer>
    <div class="landing-services__swiper my-12">
      <div
        class="landing-services__nav mb-8 flex items-center gap-2"
        :class="dir === 'rtl' ? 'justify-end' : 'justify-start'"
      >
        <button
          type="button"
          class="landing-services__nav-btn landing-services__nav-prev border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :aria-label="navPrevLabel"
        >
          <UIcon
            :name="dir === 'rtl' ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
            class="size-4"
          />
        </button>
        <button
          type="button"
          class="landing-services__nav-btn landing-services__nav-next border-gray-200 bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
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
        :slides-per-view="1.15"
        :space-between="16"
        :breakpoints="swiperBreakpoints"
        autoplay
        loop
        :navigation="navigationOptions"
        :pagination="paginationOptions"
        class="landing-services-swiper"
      >
        <SwiperSlide v-for="post in (posts || [])" :key="post.slug" class="!h-auto py-2">
          <SharedContentCard
            :title="getTitle(post)"
            :description="getDescription(post)"
            :to="localePath(`/service/${post.slug}`)"
            :cta="t('home.sections.services.cta')"
            class="h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </UContainer>
</template>

<style scoped>
.landing-services__swiper {
  pointer-events: auto;
}

.landing-services-swiper :deep(.swiper-pagination) {
  position: relative !important;
  bottom: auto !important;
  margin-top: 1rem;
  width: 100%;
}

.landing-services-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: var(--ui-primary);
}

.landing-services-swiper :deep(.swiper-slide) {
  height: auto;
}

.landing-services__nav-btn {
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

.landing-services__nav-btn.swiper-button-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.landing-services__nav-btn::after {
  display: none;
}

.landing-services__swiper :deep(.landing-services__nav-btn.swiper-button-prev),
.landing-services__swiper :deep(.landing-services__nav-btn.swiper-button-next) {
  position: static;
  inset: auto;
  margin: 0;
}
</style>
