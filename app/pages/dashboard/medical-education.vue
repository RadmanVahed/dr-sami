<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UDashboardPanel id="medical-education">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.medicalEducation')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="grid gap-6 p-4 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <UCard class="p-4">
            <DashboardCategoryManager section="medical" />
          </UCard>
        </div>
        <div class="lg:col-span-2">
          <DashboardPostManager
            section="medical"
            :title="t('dashboard.menu.medicalEducation')"
            show-category
            category-section="medical"
            embedded
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
