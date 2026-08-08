<script setup lang="ts">
import type { PostSection } from '~/types/content'

const props = defineProps<{
  section: PostSection
  basePath: string
  showCategories?: boolean
  categorySection?: 'blog' | 'medical' | 'patient'
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const dir = useDir()
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

const categoryOptions = computed(() => [
  { label: locale.value === 'fa' ? 'همه' : 'All', value: null },
  ...(categories.value || []).map((c: any) => ({
    label: getName(c),
    value: c.id
  }))
])

const ctaLabel = computed(() =>
  props.section === 'service'
    ? t('home.sections.services.cta')
    : t('home.sections.blog.cta')
)
</script>

<template>
  <UContainer :dir="dir" class="my-8">
    <div v-if="showCategories && categoryOptions.length > 1" class="mb-6">
      <USelectMenu
        v-model="selectedCategory"
        :items="categoryOptions"
        value-key="value"
        class="max-w-xs"
      />
    </div>

    <UPageGrid>
      <SharedContentCard
        v-for="post in (posts || [])"
        :key="post.id"
        :title="getTitle(post)"
        :description="getDescription(post)"
        :to="localePath(`${basePath}/${post.slug}`)"
        :cta="ctaLabel"
      />
    </UPageGrid>

    <div v-if="!posts?.length" class="py-12 text-center text-muted">
      {{ locale === 'fa' ? 'موردی یافت نشد' : 'No items found' }}
    </div>
  </UContainer>
</template>
