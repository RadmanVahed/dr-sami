<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ root: `text-muted text-xs ${useDir().value}` }"
  >
    <template #default>
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-x-6 w-full">
        <div class="flex flex-col gap-1 min-w-0">
          <a
            href="tel:09372587464"
            class="hover:underline text-default"
          >
            {{ t('footer.phone') }}
          </a>
          <p class="leading-relaxed">
            {{ t('footer.address') }}
          </p>
        </div>
        <a class="hover:underline shrink-0" target="_blank" href="https://aradcore.com">
          {{ t('footer.creator') }}
        </a>
      </div>
    </template>
  </UFooter>
</template>
