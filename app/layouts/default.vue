<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UBanner v-if="$device.isDesktopOrTablet" :dir="useDir().value" :title="t('banner')" />
  <div class="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter class="mt-auto border-t border-neutral-200 dark:border-neutral-800" />
  </div>
</template>
