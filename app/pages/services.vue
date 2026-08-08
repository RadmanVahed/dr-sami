<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const dir = useDir()
const { posts } = useServices()
const { getTitle, getDescription } = useLocalizedField()

useHead({ title: t('services.pageTitle') })
</script>

<template>
  <UContainer :dir="dir" class="my-8">
    <UPageGrid>
      <SharedContentCard
        v-for="post in (posts || [])"
        :key="post.slug"
        :title="getTitle(post)"
        :description="getDescription(post)"
        :to="localePath(`/service/${post.slug}`)"
        :cta="t('home.sections.services.cta')"
      />
    </UPageGrid>
  </UContainer>
</template>
