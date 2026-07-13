<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('navigation.medicalEducation') })
</script>

<template>
  <SharedContentPostList
    section="medical"
    base-path="/education"
    show-categories
    category-section="medical"
  />
</template>
