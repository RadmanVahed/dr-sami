<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'
import { useDir } from '~/composables/useDir'

const { locale: currentLocale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value
})
</script>

<template>
  <div>
    <UPopover :ui="{
      content:'m-2'
    }" >
      <UButton color="neutral" variant="ghost" class="rounded-full ring-inset" icon="i-lucide-globe" />

      <template #content>
       <div class="flex flex-col w-full p-1 gap-1">
        <UButton
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      color="neutral"
      variant="ghost"
      class="locale-link"
      :class="{ 'is-active': locale.code === currentLocale }"
    >
      {{ locale.name }}
    </UButton>
       </div>
      </template>
    </UPopover>
  </div>
</template>
