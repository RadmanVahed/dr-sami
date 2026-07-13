<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="h_iframe-aparat_embed_frame">
    <span style="display: block;padding-top: 57%" />
    <iframe
      :src="src"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
    />
  </div>
</template>

<style scoped>
.h_iframe-aparat_embed_frame {
  position: relative;
}

.h_iframe-aparat_embed_frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0.75rem;
}
</style>
