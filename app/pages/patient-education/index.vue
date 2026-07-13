<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('navigation.patientEducation') })
</script>

<template>
  <SharedContentPostList
    section="patient"
    base-path="/patient-education"
    show-categories
    category-section="patient"
  />
</template>
