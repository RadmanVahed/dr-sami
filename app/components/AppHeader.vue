<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()


</script>


<template>
  <UHeader mode="drawer" :ui="{ right: 'gap-0', title: 'gap-0', left: 'gap-0' }" :menu="{ direction: 'top' }">
    <template #title>
      <ClientOnly>
 <NuxtLink :to="localePath('/')">
         <span class="text-xl">دکتر رامین سامی</span>
      </NuxtLink>
      </ClientOnly>

    </template>

    <UNavigationMenu variant="link" dir="rtl" :items="[
  { label: t('basic.services'), to: localePath('/services') },
  { label: t('navigation.appointment'), to: localePath('/appointment') },
  { label: t('navigation.medicalEducation'), to: '/' },
  { label: t('navigation.patientEducation'), to: '/' },
  { label: t('navigation.aboutDoctor'), to: localePath('/about') },
  { label: t('navigation.contact') , to:localePath('/contact') }
]" class="hidden md:flex" />

    <template #body>
      <UNavigationMenu dir="rtl" :items="[
  { label: t('basic.services'), to: '/' },
  { label: t('navigation.appointment'), to: localePath('/appointment') },
  { label: t('navigation.medicalEducation'), to: '/' },
  { label: t('navigation.patientEducation'), to: '/' },
  { label: t('navigation.aboutDoctor'), to: localePath('/about') },
  { label: t('navigation.contact') , to:localePath('/contact') }
]" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <LanguageSwitcher />
      <ColorModeButton />
    </template>
  </UHeader>
</template>
