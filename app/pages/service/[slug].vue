<script setup lang="ts">
const route = useRoute()
const { findBySlug } = useServices()
const { getTitle, getDescription, getAttachmentTitle } = useLocalizedField()

const slug = computed(() => String(route.params.slug))
const { data: post } = await useFetch(`/api/content/posts/${slug.value}`)

watch([post], () => {
  if (post.value === null) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
}, { immediate: true })

const service = computed(() => post.value || findBySlug(slug.value))
</script>

<template>
  <UContainer v-if="service" :dir="useDir().value" class="mt-8">
    <UChangelogVersion
      :title="getTitle(service)"
      :description="getDescription(service)"
      :indicator="false"
    >
      <template v-if="service.videoUrl" #image>
        <SharedAparatEmbed :src="service.videoUrl" />
      </template>
      <template v-else-if="service.image" #image>
        <NuxtImg :src="service.image" :alt="getTitle(service)" class="w-full rounded-xl object-cover" />
      </template>
    </UChangelogVersion>

    <div v-if="service.attachments?.length" class="mt-8">
      <h3 class="mb-4 text-lg font-semibold">
        {{ useI18n().locale.value === 'fa' ? 'فایل‌ها و منابع' : 'Files & References' }}
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <UCard v-for="att in service.attachments" :key="att.id" class="p-4">
          <UButton
            :label="getAttachmentTitle(att)"
            :to="att.url"
            :target="att.kind === 'link' ? '_blank' : '_self'"
            variant="link"
            :download="att.kind === 'file'"
          />
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
