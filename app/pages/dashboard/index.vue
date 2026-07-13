<script setup lang="ts">
import type { DashboardStats } from '~/types/content'

const { t } = useI18n()

const { data: stats } = await useFetch<DashboardStats>('/api/admin/stats')

const statCards = computed(() => [
  { label: t('dashboard.menu.services'), value: stats.value?.services ?? 0, icon: 'i-lucide-stethoscope', color: 'primary' },
  { label: t('dashboard.menu.blog'), value: stats.value?.blogs ?? 0, icon: 'i-lucide-newspaper', color: 'info' },
  { label: t('dashboard.menu.medicalEducation'), value: stats.value?.medical ?? 0, icon: 'i-lucide-graduation-cap', color: 'success' },
  { label: t('dashboard.menu.patientEducation'), value: stats.value?.patient ?? 0, icon: 'i-lucide-heart-pulse', color: 'warning' },
  { label: t('dashboard.menu.faq'), value: stats.value?.faqs ?? 0, icon: 'i-lucide-circle-help', color: 'neutral' },
  { label: t('dashboard.categories.title'), value: stats.value?.categories ?? 0, icon: 'i-lucide-folder-tree', color: 'neutral' }
])
</script>

<template>
  <UDashboardPanel id="overview">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.overview')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="card in statCards" :key="card.label" class="p-4">
          <div class="flex items-center gap-4">
            <div class="flex size-12 items-center justify-center rounded-lg bg-elevated">
              <UIcon :name="card.icon" class="size-6 text-primary" />
            </div>
            <div>
              <p class="text-sm text-muted">{{ card.label }}</p>
              <p class="text-2xl font-bold">{{ card.value }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
