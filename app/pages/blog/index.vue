<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('blog.meta.sectionTitle') })
</script>

<template>
  <SharedContentPostList
    section="blog"
    base-path="/blog"
    show-categories
    category-section="blog"
  />
</template>
