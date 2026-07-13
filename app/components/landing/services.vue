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
        :slides-per-view="$device.isDesktop ? 3 : $device.isTablet ? 2 : 1"
        :space-between="50"
        autoplay
        loop
        :navigation="navigationOptions"
        :pagination="paginationOptions"
        class="landing-services-swiper"
      >
        <SwiperSlide v-for="post in (posts || [])" :key="post.slug" class="py-2">
          <ClientOnly>
            <UPageCard
              class="m-2 flex min-h-[536px] flex-col"
              :title="getTitle(post)"
              :ui="{
                title: 'text-xl line-clamp-2',
                header: 'w-full',
                wrapper: 'flex flex-1 flex-col',
                footer: 'mt-auto pt-4'
              }"
            >
              <template #header>
                <NuxtImg
                  :src="post.image || '/images/services/consultation.png'"
                  :alt="getTitle(post)"
                  class="mb-8 w-full rounded-xl object-cover"
                  format="webp"
                  loading="lazy"
                />
              </template>

              <template #description>
                <span class="line-clamp-3 text-base text-gray-600 dark:text-gray-300">
                  {{ getDescription(post) }}
                </span>
              </template>

              <template #footer>
                <UButton
                  :label="t('home.sections.services.cta')"
                  :to="localePath(`/service/${post.slug}`)"
                  color="primary"
                  variant="soft"
                  block
                  :trailing-icon="dir === 'rtl' ? 'i-lucide-chevron-left' : 'i-lucide-arrow-right'"
                />
              </template>
            </UPageCard>
          </ClientOnly>
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
