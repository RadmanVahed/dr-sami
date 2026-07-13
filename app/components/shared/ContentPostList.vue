<script setup lang="ts">
import type { PostSection } from '~/types/content'

const props = defineProps<{
  section: PostSection
  basePath: string
  showCategories?: boolean
  categorySection?: 'blog' | 'medical' | 'patient'
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const { getTitle, getDescription, getName } = useLocalizedField()

const selectedCategory = ref<number | null>(null)

const { data: posts } = await useFetch('/api/content/posts', {
  query: computed(() => ({
    section: props.section,
    ...(selectedCategory.value ? { category: selectedCategory.value } : {})
  }))
})

const { data: categories } = props.showCategories && props.categorySection
  ? await useFetch('/api/content/categories', {
      query: { section: props.categorySection }
    })
  : { data: ref([]) }

const authors = computed(() => [{
  name: useI18n().t('basic.dr'),
  avatar: { src: '/images/profilePic3.png', alt: 'Doctor' },
  to: localePath('/about')
}])

function formattedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const categoryOptions = computed(() => [
  { label: locale.value === 'fa' ? 'همه' : 'All', value: null },
  ...(categories.value || []).map((c: any) => ({
    label: getName(c),
    value: c.id
  }))
])
</script>

<template>
  <UContainer :dir="useDir().value" class="my-8">
    <div v-if="showCategories && categoryOptions.length > 1" class="mb-6">
      <USelectMenu
        v-model="selectedCategory"
        :items="categoryOptions"
        value-key="value"
        class="max-w-xs"
      />
    </div>

    <UPageGrid>
      <div v-for="post in (posts || [])" :key="post.id" class="my-4">
        <UBlogPost
          :to="localePath(`${basePath}/${post.slug}`)"
          :title="getTitle(post)"
          :description="getDescription(post)"
          :image="post.image ? { src: post.image, alt: getTitle(post) } : undefined"
          :date="formattedDate(post.publishedAt)"
          :authors="authors"
          orientation="vertical"
          :ui="{ description: 'line-clamp-3' }"
          class="min-h-[400px]"
        />
      </div>
    </UPageGrid>

    <div v-if="!posts?.length" class="py-12 text-center text-muted">
      {{ locale === 'fa' ? 'موردی یافت نشد' : 'No items found' }}
    </div>
  </UContainer>
</template>
