<script setup lang="ts">
import type { Post, PostSection, CategorySection, Category } from '~/types/content'

const props = defineProps<{
  section: PostSection
  title: string
  showCategory?: boolean
  categorySection?: CategorySection
  embedded?: boolean
}>()

const { t } = useI18n()
const toast = useToast()

const search = ref('')
const showForm = ref(false)
const editingPost = ref<Post | null>(null)
const deleteModal = ref(false)
const postToDelete = ref<Post | null>(null)

const { data: posts, refresh, pending } = await useFetch<Post[]>('/api/admin/posts', {
  query: { section: props.section }
})

const { data: categories } = props.showCategory && props.categorySection
  ? await useFetch<Category[]>('/api/admin/categories', {
      query: { section: props.categorySection }
    })
  : { data: ref([]) }

const filteredPosts = computed(() => {
  if (!posts.value) return []
  const q = search.value.toLowerCase()
  if (!q) return posts.value
  return posts.value.filter(p =>
    p.titleFa.toLowerCase().includes(q)
    || p.titleEn.toLowerCase().includes(q)
    || p.slug.toLowerCase().includes(q)
  )
})

function openCreate() {
  editingPost.value = null
  showForm.value = true
}

function openEdit(post: Post) {
  editingPost.value = post
  showForm.value = true
}

function onSaved() {
  showForm.value = false
  editingPost.value = null
  refresh()
}

function confirmDelete(post: Post) {
  postToDelete.value = post
  deleteModal.value = true
}

async function deletePost() {
  if (!postToDelete.value) return
  try {
    await $fetch(`/api/admin/posts/${postToDelete.value.id}`, { method: 'DELETE' })
    toast.add({ title: t('dashboard.messages.deleteSuccess'), color: 'success' })
    deleteModal.value = false
    postToDelete.value = null
    refresh()
  } catch {
    toast.add({ title: t('dashboard.messages.deleteError'), color: 'error' })
  }
}

const columns = [
  { accessorKey: 'titleFa', header: t('dashboard.form.titleFa') },
  { accessorKey: 'slug', header: t('dashboard.form.slug') },
  { id: 'actions', header: t('dashboard.table.actions') }
]
</script>

<template>
  <UDashboardPanel v-if="!embedded" :id="section">
    <template #header>
      <UDashboardNavbar :title="title">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton :label="t('dashboard.actions.add')" icon="i-lucide-plus" @click="openCreate" />
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <UInput v-model="search" :placeholder="t('dashboard.search')" icon="i-lucide-search" class="max-w-sm" />
      </UDashboardToolbar>
    </template>
    <template #body>
      <div v-if="showForm" class="p-4">
        <UCard>
          <DashboardPostForm
            :section="section"
            :post="editingPost"
            :categories="categories || []"
            :show-category="showCategory"
            @saved="onSaved"
            @cancel="showForm = false"
          />
        </UCard>
      </div>
      <div v-else class="p-4">
        <UTable :data="filteredPosts" :columns="columns" :loading="pending">
          <template #actions-cell="{ row }">
            <div class="flex gap-2">
              <UButton icon="i-lucide-pencil" size="sm" variant="ghost" @click="openEdit(row.original)" />
              <UButton icon="i-lucide-trash" size="sm" color="error" variant="ghost" @click="confirmDelete(row.original)" />
            </div>
          </template>
        </UTable>
      </div>
      <UModal v-model:open="deleteModal">
        <template #content>
          <UCard>
            <p>{{ t('dashboard.confirmDelete.post') }}</p>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="deleteModal = false" />
                <UButton :label="t('dashboard.actions.delete')" color="error" @click="deletePost" />
              </div>
            </template>
          </UCard>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>

  <div v-else>
    <div class="mb-4 flex items-center justify-between">
      <UInput v-model="search" :placeholder="t('dashboard.search')" icon="i-lucide-search" class="max-w-sm" />
      <UButton :label="t('dashboard.actions.add')" icon="i-lucide-plus" size="sm" @click="openCreate" />
    </div>
    <div v-if="showForm">
      <UCard class="mb-4">
        <DashboardPostForm
          :section="section"
          :post="editingPost"
          :categories="categories || []"
          :show-category="showCategory"
          @saved="onSaved"
          @cancel="showForm = false"
        />
      </UCard>
    </div>
    <UTable v-else :data="filteredPosts" :columns="columns" :loading="pending">
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <UButton icon="i-lucide-pencil" size="sm" variant="ghost" @click="openEdit(row.original)" />
          <UButton icon="i-lucide-trash" size="sm" color="error" variant="ghost" @click="confirmDelete(row.original)" />
        </div>
      </template>
    </UTable>
    <UModal v-model:open="deleteModal">
      <template #content>
        <UCard>
          <p>{{ t('dashboard.confirmDelete.post') }}</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="deleteModal = false" />
              <UButton :label="t('dashboard.actions.delete')" color="error" @click="deletePost" />
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
