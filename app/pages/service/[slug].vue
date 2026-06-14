<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { findBySlug } = useServices()

const selectedService = computed(() => findBySlug(String(route.params.slug)))

watch(selectedService, (service) => {
  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
}, { immediate: true })
</script>

<template>
  <UContainer v-if="selectedService" :dir="useDir().value" class="mt-8">
    <UChangelogVersion
      :title="t(`services.list.${selectedService.key}.title`)"
      :description="t(`services.list.${selectedService.key}.description`)"
      :indicator="false"
    >
      <template #image>
        <div class="h_iframe-aparat_embed_frame">
          <span style="display: block;padding-top: 57%" />
          <iframe
            src="https://www.aparat.com/video/video/embed/videohash/civ9p18/vt/frame"
            allowFullScreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          />
        </div>
      </template>
    </UChangelogVersion>
  </UContainer>
</template>

<style scoped>
.h_iframe-aparat_embed_frame {
  position: relative;
}

.h_iframe-aparat_embed_frame .ratio {
  display: block;
  width: 100%;
  height: auto;
}

.h_iframe-aparat_embed_frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
