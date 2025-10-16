<script setup lang="ts">


const props = defineProps<{
  page: any
}>()

</script>

<template>
  <UPageSection
    :title="page?.body.title"
    :description="page?.body.description"
    :ui="{
      container: '!p-0',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted'
    }"
  />
</template>

<style scoped>

</style>
