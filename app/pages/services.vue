<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({
  title: t('services.pageTitle')
})

const { services } = useServices()
</script>

<template>
  <UContainer :dir="useDir().value" class="my-8">
    <UPageGrid>
      <UPageCard v-for="(service, index) in services" :key="index" :title="t(`services.list.${service.key}.title`)"
        :to="localePath(service.to)" :ui="{ title: 'text-xl' }">
        <template #header>
          <NuxtImg :src="service.image" :alt="t(`services.list.${service.key}.title`)"
            class="w-full h-40 object-cover rounded-xl mb-4" format="webp" loading="lazy" />
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
