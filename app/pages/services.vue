<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('services.pageTitle')
})

const services = [
  {
    key: 'asthmaAllergy',
    to: '/services/asthma-allergy',
    image: '/images/services/asthma-allergy.png'
  },
  {
    key: 'copd',
    to: '/services/copd',
    image: '/images/services/copd.png'
  },
  {
    key: 'bronchoscopy',
    to: '/services/bronchoscopy',
    image: '/images/services/bronchoscopy.png'
  },
  {
    key: 'spirometry',
    to: '/services/spirometry',
    image: '/images/services/spirometry.png'
  },
  {
    key: 'ildFibrosis',
    to: '/services/ild-fibrosis',
    image: '/images/services/ild-fibrosis.png'
  },
  {
    key: 'sleepApnea',
    to: '/services/sleep-apnea',
    image: '/images/services/sleep-apnea.png'
  },
  {
    key: 'cancerScreening',
    to: '/services/lung-cancer-screening',
    image: '/images/services/lung-cancer-screening.png'
  },
  {
    key: 'consultation',
    to: '/services/consultation',
    image: '/images/services/consultation.png'
  }
]
</script>

<template>
  <UContainer :dir="useDir().value" class="my-8">
      <UPageGrid>
    <UPageCard
      v-for="(service, index) in services"
      :key="index"
      :title="t(`services.list.${service.key}.title`)"

      :ui="{ title: 'text-xl' }"
    >
      <template #header>
        <NuxtImg
          :src="service.image"
          :alt="t(`services.list.${service.key}.title`)"
          class="w-full h-40 object-cover rounded-xl mb-4"
          format="webp"
          loading="lazy"
        />
      </template>

      <template #description>
        <span class="line-clamp-3 text-base text-gray-600 dark:text-gray-300">
          {{ t(`services.list.${service.key}.description`) }}
        </span>
      </template>
    </UPageCard>
  </UPageGrid>
  </UContainer>
</template>
