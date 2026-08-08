<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  cta: string
}>()

const dir = useDir()
</script>

<template>
  <article
    class="flex flex-col rounded-3xl bg-default p-5 ring ring-default"
  >
    <div class="mb-4 flex justify-start">
      <span
        class="inline-flex size-10 items-center justify-center rounded-2xl text-highlighted ring ring-default"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-5"
        >
          <path d="M12 5v10.5" />
          <path d="M12 8.5c-1.2-2.2-2.6-3.7-4.2-4.1C5.5 3.8 3.5 5.6 3.5 8.4v5.2c0 3.1 1.7 5.8 4.2 6.8.6.2 1.2-.3 1.2-.9V11c0-1.8.8-3.4 2.1-4.4" />
          <path d="M12 8.5c1.2-2.2 2.6-3.7 4.2-4.1 2.3-.6 4.3 1.2 4.3 4v5.2c0 3.1-1.7 5.8-4.2 6.8-.6.2-1.2-.3-1.2-.9V11c0-1.8-.8-3.4-2.1-4.4" />
        </svg>
      </span>
    </div>

    <h3 class="mb-2 text-base font-semibold leading-snug text-highlighted sm:text-lg">
      {{ title }}
    </h3>

    <p class="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">
      {{ description }}
    </p>

    <div class="mt-auto pt-1">
      <UButton
        :label="cta"
        :to="to"
        color="primary"
        variant="soft"
        size="md"
        block
        class="rounded-full justify-center"
        :trailing-icon="dir === 'rtl' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'"
      />
    </div>
  </article>
</template>
