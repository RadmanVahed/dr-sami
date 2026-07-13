<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const dir = useDir()
const menuSide = computed(() => (dir.value === 'rtl' ? 'right' : 'left'))
const open = ref(false)

const links = [[{
  label: t('dashboard.menu.overview'),
  icon: 'i-lucide-layout-dashboard',
  to: localePath('/dashboard'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.services'),
  icon: 'i-lucide-stethoscope',
  to: localePath('/dashboard/services'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.blog'),
  icon: 'i-lucide-newspaper',
  to: localePath('/dashboard/blog'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.medicalEducation'),
  icon: 'i-lucide-graduation-cap',
  to: localePath('/dashboard/medical-education'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.patientEducation'),
  icon: 'i-lucide-heart-pulse',
  to: localePath('/dashboard/patient-education'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.faq'),
  icon: 'i-lucide-circle-help',
  to: localePath('/dashboard/faq'),
  onSelect: () => { open.value = false }
}, {
  label: t('dashboard.menu.settings'),
  icon: 'i-lucide-settings',
  to: localePath('/dashboard/settings/security'),
  onSelect: () => { open.value = false }
}], [{
  label: t('dashboard.menu.backToSite'),
  icon: 'i-lucide-external-link',
  to: localePath('/'),
  target: '_self'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardGroup :dir="dir" unit="rem">
    <UDashboardSidebar
      id="default"
      :dir="dir"
      :toggle-side="menuSide"
      :menu="{ side: menuSide }"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="px-2 py-3 font-semibold text-primary">
          {{ t('dashboard.title') }}
        </div>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :dir="dir"
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :dir="dir"
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
