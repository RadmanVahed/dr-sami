<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation , Autoplay } from 'swiper/modules'

const { t } = useI18n()

const services = [
  { key: 'asthmaAllergy', to: '/services/asthma-allergy', image: '/images/services/asthma-allergy.png' },
  { key: 'copd', to: '/services/copd', image: '/images/services/copd.png' },
  { key: 'bronchoscopy', to: '/services/bronchoscopy', image: '/images/services/bronchoscopy.png' },
  { key: 'spirometry', to: '/services/spirometry', image: '/images/services/spirometry.png' },
  { key: 'ildFibrosis', to: '/services/ild-fibrosis', image: '/images/services/ild-fibrosis.png' },
  { key: 'sleepApnea', to: '/services/sleep-apnea', image: '/images/services/sleep-apnea.png' },
  { key: 'cancerScreening', to: '/services/lung-cancer-screening', image: '/images/services/lung-cancer-screening.png' },
  { key: 'consultation', to: '/services/consultation', image: '/images/services/consultation.png' }
]
</script>

<template>
  <UContainer>
    <Swiper :modules="[Pagination, Navigation , Autoplay]" :slides-per-view="$device.isDesktop ? 3 : $device.isTablet ? 2 : 1"
      :space-between="50" autoplay loop :navigation="$device.isDesktopOrTablet"
      :pagination="{ clickable: true, dynamicBullets: true }" class="my-12">
      <SwiperSlide class="py-2" v-for="item in services" :key="item.key">
        <ClientOnly>
          <UPageCard class="m-2 min-h-[536px]" :title="t(`services.list.${item.key}.title`)" :to="item.to"
            :ui="{ title: 'text-xl line-clamp-2', header: 'w-full' }">
            <template #header>
              <NuxtImg :src="item.image" :alt="t(`services.list.${item.key}.title`)"
                class="w-full object-cover rounded-xl mb-8" format="webp" loading="lazy" />
            </template>

            <template #description>
              <span class="line-clamp-3 text-base text-gray-600 dark:text-gray-300">
                {{ t(`services.list.${item.key}.description`) }}
              </span>
            </template>
          </UPageCard>
        </ClientOnly>
      </SwiperSlide>
    </Swiper>
  </UContainer>
</template>
