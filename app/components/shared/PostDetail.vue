<script setup lang="ts">
const route = useRoute()
const { getTitle, getDescription, getAttachmentTitle } = useLocalizedField()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))

const { data: post } = await useFetch(`/api/content/posts/${slug.value}`)

watch(post, (p) => {
  if (p === null) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
}, { immediate: true })
</script>

<template>
  <UContainer v-if="post" :dir="useDir().value" class="mt-8">
    <UChangelogVersion
      :title="getTitle(post)"
      :description="getDescription(post)"
      :indicator="false"
    >
      <template v-if="post.videoUrl" #image>
        <SharedAparatEmbed :src="post.videoUrl" />
      </template>
      <template v-else-if="post.image" #image>
        <NuxtImg :src="post.image" :alt="getTitle(post)" class="w-full rounded-xl object-cover" />
      </template>
    </UChangelogVersion>

    <div v-if="post.attachments?.length" class="mt-8">
      <h3 class="mb-4 text-lg font-semibold">
        {{ useI18n().locale.value === 'fa' ? 'فایل‌ها و منابع' : 'Files & References' }}
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <UCard
          v-for="att in post.attachments"
          :key="att.id"
          class="p-4"
        >
          <div class="flex items-center gap-3">
            <UIcon
              :name="att.kind === 'file' ? 'i-lucide-file' : 'i-lucide-link'"
              class="size-5 text-primary"
            />
            <UButton
              :label="getAttachmentTitle(att)"
              :to="att.url"
              :target="att.kind === 'link' ? '_blank' : '_self'"
              variant="link"
              :download="att.kind === 'file'"
            />
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
