<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
  y?: number
}>(), {
  delay: 0,
  y: 24
})
</script>

<template>
  <Motion
    :initial="{ opacity: 0, transform: `translateY(${y}px)` }"
    :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
    :transition="{ duration: 0.55, delay }"
    :in-view-options="{ once: true, margin: '-48px 0px' }"
  >
    <slot />
  </Motion>
</template>
