<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UDashboardPanel id="blog">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.blog')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="grid gap-6 p-4 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <UCard class="p-4">
            <DashboardCategoryManager section="blog" />
          </UCard>
        </div>
        <div class="lg:col-span-2">
          <DashboardPostManager
            section="blog"
            :title="t('dashboard.menu.blog')"
            show-category
            category-section="blog"
            embedded
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
