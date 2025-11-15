<script setup lang="ts">
const { footer } = useAppConfig()

const { t, locales } = useI18n()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ root: `text-muted text-xs ${useDir().value}` }"
  >
    <template #default>
      <a class="hover:underline" target="_blank" href="https://aradcore.com">
        {{ t('footer.creator') }}
      </a>
    </template>
  </UFooter>
</template>
