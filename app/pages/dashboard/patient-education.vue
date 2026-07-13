<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UDashboardPanel id="patient-education">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.patientEducation')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="grid gap-6 p-4 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <UCard class="p-4">
            <DashboardCategoryManager section="patient" />
          </UCard>
        </div>
        <div class="lg:col-span-2">
          <DashboardPostManager
            section="patient"
            :title="t('dashboard.menu.patientEducation')"
            show-category
            category-section="patient"
            embedded
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
