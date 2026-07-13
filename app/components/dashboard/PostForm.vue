<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Post, PostInput, PostSection, Category, Attachment } from '~/types/content'

const props = defineProps<{
  section: PostSection
  post?: Post | null
  categories?: Category[]
  showCategory?: boolean
}>()

const emit = defineEmits<{
  saved: []
  cancel: []
}>()

const { t } = useI18n()
const toast = useToast()
const saving = ref(false)
const imageUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const APARAT_REGEX = /^https:\/\/www\.aparat\.com\/video\/video\/embed\/videohash\/[a-zA-Z0-9]+\/vt\/frame$/

const schema = z.object({
  slug: z.string().min(1),
  titleFa: z.string().min(1),
  titleEn: z.string().min(1),
  descriptionFa: z.string().min(1),
  descriptionEn: z.string().min(1),
  image: z.string().optional(),
  videoUrl: z.string().optional().refine(
    val => !val || APARAT_REGEX.test(val),
    { message: t('dashboard.form.invalidAparatUrl') }
  ),
  categoryId: z.number().optional().nullable()
})

type Schema = z.output<typeof schema>

const state = reactive<Schema & { attachments: Attachment[] }>({
  slug: '',
  titleFa: '',
  titleEn: '',
  descriptionFa: '',
  descriptionEn: '',
  image: '',
  videoUrl: '',
  categoryId: null,
  attachments: []
})

const langTab = ref<'fa' | 'en'>('fa')

watch(() => props.post, (post) => {
  if (post) {
    state.slug = post.slug
    state.titleFa = post.titleFa
    state.titleEn = post.titleEn
    state.descriptionFa = post.descriptionFa
    state.descriptionEn = post.descriptionEn
    state.image = post.image || ''
    state.videoUrl = post.videoUrl || ''
    state.categoryId = post.categoryId
    state.attachments = post.attachments ? [...post.attachments] : []
  }
}, { immediate: true })

const categoryOptions = computed(() => {
  if (!props.categories) return []
  return props.categories.map(c => ({
    label: `${c.nameFa} / ${c.nameEn}`,
    value: c.id
  }))
})

async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return await $fetch<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: formData
  })
}

async function onImageSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  imageUploading.value = true
  try {
    const result = await uploadFile(file)
    state.image = result.url
    toast.add({ title: t('dashboard.messages.uploadSuccess'), color: 'success' })
  } catch {
    toast.add({ title: t('dashboard.messages.uploadError'), color: 'error' })
  } finally {
    imageUploading.value = false
  }
}

function addAttachment() {
  state.attachments.push({
    titleFa: '',
    titleEn: '',
    kind: 'link',
    url: ''
  })
}

function removeAttachment(index: number) {
  state.attachments.splice(index, 1)
}

async function onAttachmentFile(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const result = await uploadFile(file)
    state.attachments[index].url = result.url
    state.attachments[index].kind = 'file'
    toast.add({ title: t('dashboard.messages.uploadSuccess'), color: 'success' })
  } catch {
    toast.add({ title: t('dashboard.messages.uploadError'), color: 'error' })
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  saving.value = true
  const payload: PostInput = {
    section: props.section,
    slug: event.data.slug,
    titleFa: event.data.titleFa,
    titleEn: event.data.titleEn,
    descriptionFa: event.data.descriptionFa,
    descriptionEn: event.data.descriptionEn,
    image: event.data.image || null,
    videoUrl: event.data.videoUrl || null,
    categoryId: event.data.categoryId || null,
    attachments: state.attachments.filter(a => a.url && a.titleFa && a.titleEn)
  }

  try {
    if (props.post?.id) {
      await $fetch(`/api/admin/posts/${props.post.id}`, { method: 'PUT', body: payload })
    } else {
      await $fetch('/api/admin/posts', { method: 'POST', body: payload })
    }
    toast.add({ title: t('dashboard.messages.saveSuccess'), color: 'success' })
    emit('saved')
  } catch (err: any) {
    toast.add({
      title: t('dashboard.messages.saveError'),
      description: err?.data?.statusMessage || err?.message,
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
    <UTabs
      :items="[
        { label: t('dashboard.form.persian'), value: 'fa' },
        { label: t('dashboard.form.english'), value: 'en' }
      ]"
      v-model="langTab"
      class="w-full"
    />

    <div v-show="langTab === 'fa'" class="space-y-4">
      <UFormField :label="t('dashboard.form.titleFa')" name="titleFa" required>
        <UInput v-model="state.titleFa" class="w-full" />
      </UFormField>
      <UFormField :label="t('dashboard.form.descriptionFa')" name="descriptionFa" required>
        <UTextarea v-model="state.descriptionFa" :rows="5" class="w-full" />
      </UFormField>
    </div>

    <div v-show="langTab === 'en'" class="space-y-4">
      <UFormField :label="t('dashboard.form.titleEn')" name="titleEn" required>
        <UInput v-model="state.titleEn" class="w-full" />
      </UFormField>
      <UFormField :label="t('dashboard.form.descriptionEn')" name="descriptionEn" required>
        <UTextarea v-model="state.descriptionEn" :rows="5" class="w-full" />
      </UFormField>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <UFormField :label="t('dashboard.form.slug')" name="slug" required>
        <UInput v-model="state.slug" class="w-full" dir="ltr" />
      </UFormField>

      <UFormField
        v-if="showCategory"
        :label="t('dashboard.form.category')"
        name="categoryId"
      >
        <USelectMenu
          v-model="state.categoryId"
          :items="categoryOptions"
          value-key="value"
          class="w-full"
          :placeholder="t('dashboard.form.selectCategory')"
        />
      </UFormField>
    </div>

    <UFormField :label="t('dashboard.form.image')" name="image">
      <div class="flex flex-col gap-3">
        <div v-if="state.image" class="relative w-full max-w-xs">
          <NuxtImg :src="state.image" class="h-32 w-full rounded-lg object-cover" />
        </div>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onImageSelect">
        <UButton
          :label="t('dashboard.form.uploadImage')"
          icon="i-lucide-upload"
          variant="outline"
          :loading="imageUploading"
          @click="fileInput?.click()"
        />
      </div>
    </UFormField>

    <UFormField :label="t('dashboard.form.videoUrl')" name="videoUrl" :hint="t('dashboard.form.aparatHint')">
      <UInput
        v-model="state.videoUrl"
        placeholder="https://www.aparat.com/video/video/embed/videohash/xxx/vt/frame"
        class="w-full"
        dir="ltr"
      />
    </UFormField>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">{{ t('dashboard.form.attachments') }}</h4>
        <UButton
          :label="t('dashboard.form.addAttachment')"
          icon="i-lucide-plus"
          size="sm"
          variant="soft"
          @click="addAttachment"
        />
      </div>

      <UCard v-for="(att, index) in state.attachments" :key="index" class="p-4">
        <div class="grid gap-3 md:grid-cols-2">
          <UInput v-model="att.titleFa" :placeholder="t('dashboard.form.titleFa')" />
          <UInput v-model="att.titleEn" :placeholder="t('dashboard.form.titleEn')" dir="ltr" />
          <USelectMenu
            v-model="att.kind"
            :items="[
              { label: t('dashboard.form.file'), value: 'file' },
              { label: t('dashboard.form.link'), value: 'link' }
            ]"
            value-key="value"
            class="w-full"
          />
          <div class="flex gap-2">
            <UInput v-if="att.kind === 'link'" v-model="att.url" :placeholder="t('dashboard.form.url')" class="flex-1" dir="ltr" />
            <template v-else>
              <UInput v-model="att.url" :placeholder="t('dashboard.form.uploadedFile')" class="flex-1" dir="ltr" readonly />
              <label class="cursor-pointer">
                <UButton icon="i-lucide-upload" variant="outline" as="span" />
                <input type="file" class="hidden" @change="onAttachmentFile(index, $event)">
              </label>
            </template>
            <UButton icon="i-lucide-trash" color="error" variant="ghost" @click="removeAttachment(index)" />
          </div>
        </div>
      </UCard>
    </div>

    <div class="flex gap-3">
      <UButton type="submit" :label="t('basic.save')" :loading="saving" />
      <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="emit('cancel')" />
    </div>
  </UForm>
</template>
