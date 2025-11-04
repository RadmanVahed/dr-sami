<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const isAnimating = ref(false)

const toggleWithAnimation = (event: MouseEvent) => {
  if (isAnimating.value) return

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    colorMode.preference = isDark.value ? 'light' : 'dark'
    return
  }

  isAnimating.value = true

  const x = event.clientX
  const y = event.clientY

  // ✅ محاسبه بهینه‌تر
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 1000,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })

  transition.finished.finally(() => {
    isAnimating.value = false
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="`تغییر به حالت ${isDark ? 'روز' : 'شب'}`"
      color="neutral"
      variant="ghost"
      :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
      class="rounded-full"
      :disabled="isAnimating"
      @click="toggleWithAnimation"
    />

    <template #placeholder>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
<style scoped>
::view-transition-new(root) {
  z-index: 100;
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
  animation: none;
  mix-blend-mode: normal;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-new(root),
  ::view-transition-old(root) {
    animation: none !important;
  }
}
</style>
