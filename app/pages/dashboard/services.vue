<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DashboardPostManager
    section="service"
    :title="t('dashboard.menu.services')"
  />
</template>
