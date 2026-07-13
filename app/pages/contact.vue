<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('contact.pageTitle')
})
</script>

<template>
  <UContainer :dir="useDir().value">
    <div class="flex flex-col items-center justify-center gap-4 p-16">
      <div class="w-full max-w-2xl space-y-6">
        <h1 class="text-2xl font-semibold text-highlighted text-center sm:text-start">
          {{ t('contact.title') }}
        </h1>

        <div class="space-y-4 text-center sm:text-start">
          <div>
            <p class="text-sm font-medium text-muted">
              {{ t('contact.phoneLabel') }}
            </p>
            <a
              href="tel:09372587464"
              class="mt-1 inline-block text-base font-semibold text-highlighted hover:underline"
            >
              {{ t('contact.phone') }}
            </a>
          </div>
          <div>
            <p class="text-sm font-medium text-muted">
              {{ t('contact.addressLabel') }}
            </p>
            <p class="mt-1 text-base text-default leading-relaxed">
              {{ t('contact.address') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
