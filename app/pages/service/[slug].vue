<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const services = [
  {
    key: 'asthmaAllergy',
    to: '/services/asthma-allergy',
    image: '/images/services/asthma-allergy.png'
  },
  {
    key: 'copd',
    to: '/services/copd',
    image: '/images/services/copd.png'
  },
  {
    key: 'bronchoscopy',
    to: '/services/bronchoscopy',
    image: '/images/services/bronchoscopy.png'
  },
  {
    key: 'spirometry',
    to: '/services/spirometry',
    image: '/images/services/spirometry.png'
  },
  {
    key: 'ildFibrosis',
    to: '/services/ild-fibrosis',
    image: '/images/services/ild-fibrosis.png'
  },
  {
    key: 'sleepApnea',
    to: '/services/sleep-apnea',
    image: '/images/services/sleep-apnea.png'
  },
  {
    key: 'cancerScreening',
    to: '/services/lung-cancer-screening',
    image: '/images/services/lung-cancer-screening.png'
  },
  {
    key: 'consultation',
    to: '/services/consultation',
    image: '/images/services/consultation.png'
  }
]
const selectedService = services.find((i) => i.key == route.params.slug)

if (!selectedService) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>
<template>
  <UContainer :dir="useDir().value" class="mt-8">
    <UChangelogVersion :title="t(`services.list.${selectedService.key}.title`)" :description="t(`services.list.${selectedService.key}.description`)" :indicator="false">
      <template #image>
        <div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe
            src="https://www.aparat.com/video/video/embed/videohash/civ9p18/vt/frame" allowFullScreen="true"
            webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
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
