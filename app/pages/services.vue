<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { services, posts } = useServices()
const { getTitle, getDescription } = useLocalizedField()

useHead({ title: t('services.pageTitle') })
</script>

<template>
  <UContainer :dir="useDir().value" class="my-8">
    <UPageGrid>
      <UPageCard
        v-for="post in (posts || [])"
        :key="post.slug"
        :title="getTitle(post)"
        :to="localePath(`/service/${post.slug}`)"
        :ui="{ title: 'text-xl' }"
      >
        <template #header>
          <NuxtImg
            :src="post.image || '/images/services/consultation.png'"
            :alt="getTitle(post)"
            class="mb-4 h-40 w-full rounded-xl object-cover"
            format="webp"
            loading="lazy"
          />
        </template>
        <template #description>
          <span class="line-clamp-3 text-base text-gray-600 dark:text-gray-300">
            {{ getDescription(post) }}
          </span>
        </template>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>
