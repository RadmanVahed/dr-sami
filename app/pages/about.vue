<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('about.pageTitle'),
})
</script>

<template>
  <div :dir="useDir().value">
    <UContainer>
      <UPageCTA :title="t('about.title')"
        :description="t('about.description')"
        orientation="horizontal" reverse variant="naked" :links="[{
          label: t('about.button'),
          to: '/files/resume.pdf',
          target: '_blank'
        }]">
        <NuxtImg src="/images/profilePic.png" :alt="t('about.alt')" width="640" height="728" loading="lazy" />
      </UPageCTA>
    </UContainer>
  </div>
</template>
