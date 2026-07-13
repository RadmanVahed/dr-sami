<script setup lang="ts">
import type { Category, CategorySection } from '~/types/content'

const props = defineProps<{
  section: CategorySection
}>()

const { t } = useI18n()
const toast = useToast()

const showForm = ref(false)
const editingCategory = ref<Category | null>(null)
const deleteModal = ref(false)
const categoryToDelete = ref<Category | null>(null)

const form = reactive({
  nameFa: '',
  nameEn: '',
  slug: '',
  parentId: null as number | null,
  sortOrder: 0
})

const { data: categories, refresh } = await useFetch<Category[]>('/api/admin/categories', {
  query: { section: props.section }
})

const parentOptions = computed(() => {
  const cats = categories.value || []
  return [
    { label: t('dashboard.form.noParent'), value: null },
    ...cats
      .filter(c => !editingCategory.value || c.id !== editingCategory.value.id)
      .map(c => ({ label: `${c.nameFa} / ${c.nameEn}`, value: c.id }))
  ]
})

const treeCategories = computed(() => {
  const cats = categories.value || []
  const roots = cats.filter(c => !c.parentId)
  return roots.map(root => ({
    ...root,
    children: cats.filter(c => c.parentId === root.id)
  }))
})

function resetForm() {
  form.nameFa = ''
  form.nameEn = ''
  form.slug = ''
  form.parentId = null
  form.sortOrder = 0
}

function openCreate() {
  editingCategory.value = null
  resetForm()
  showForm.value = true
}

function openEdit(cat: Category) {
  editingCategory.value = cat
  form.nameFa = cat.nameFa
  form.nameEn = cat.nameEn
  form.slug = cat.slug
  form.parentId = cat.parentId
  form.sortOrder = cat.sortOrder
  showForm.value = true
}

async function saveCategory() {
  const payload = {
    section: props.section,
    nameFa: form.nameFa,
    nameEn: form.nameEn,
    slug: form.slug,
    parentId: form.parentId,
    sortOrder: form.sortOrder
  }

  try {
    if (editingCategory.value) {
      await $fetch(`/api/admin/categories/${editingCategory.value.id}`, { method: 'PUT', body: payload })
    } else {
      await $fetch('/api/admin/categories', { method: 'POST', body: payload })
    }
    toast.add({ title: t('dashboard.messages.saveSuccess'), color: 'success' })
    showForm.value = false
    refresh()
  } catch {
    toast.add({ title: t('dashboard.messages.saveError'), color: 'error' })
  }
}

function confirmDelete(cat: Category) {
  categoryToDelete.value = cat
  deleteModal.value = true
}

async function deleteCategory() {
  if (!categoryToDelete.value) return
  try {
    await $fetch(`/api/admin/categories/${categoryToDelete.value.id}`, { method: 'DELETE' })
    toast.add({ title: t('dashboard.messages.deleteSuccess'), color: 'success' })
    deleteModal.value = false
    categoryToDelete.value = null
    refresh()
  } catch {
    toast.add({ title: t('dashboard.messages.deleteError'), color: 'error' })
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h4 class="font-medium">{{ t('dashboard.categories.title') }}</h4>
      <UButton
        :label="t('dashboard.categories.add')"
        icon="i-lucide-plus"
        size="sm"
        @click="openCreate"
      />
    </div>

    <UCard v-if="showForm" class="p-4">
      <div class="grid gap-3 md:grid-cols-2">
        <UInput v-model="form.nameFa" :placeholder="t('dashboard.form.nameFa')" />
        <UInput v-model="form.nameEn" :placeholder="t('dashboard.form.nameEn')" dir="ltr" />
        <UInput v-model="form.slug" :placeholder="t('dashboard.form.slug')" dir="ltr" />
        <USelectMenu
          v-model="form.parentId"
          :items="parentOptions"
          value-key="value"
          :placeholder="t('dashboard.form.parentCategory')"
          class="w-full"
        />
      </div>
      <div class="mt-4 flex gap-2">
        <UButton :label="t('basic.save')" @click="saveCategory" />
        <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="showForm = false" />
      </div>
    </UCard>

    <div class="space-y-2">
      <div
        v-for="cat in treeCategories"
        :key="cat.id"
        class="rounded-lg border border-default p-3"
      >
        <div class="flex items-center justify-between">
          <span>{{ cat.nameFa }} / {{ cat.nameEn }}</span>
          <div class="flex gap-1">
            <UButton icon="i-lucide-pencil" size="xs" variant="ghost" @click="openEdit(cat)" />
            <UButton icon="i-lucide-trash" size="xs" color="error" variant="ghost" @click="confirmDelete(cat)" />
          </div>
        </div>
        <div
          v-for="child in cat.children"
          :key="child.id"
          class="mt-2 ms-6 flex items-center justify-between rounded-md bg-elevated/50 p-2"
        >
          <span class="text-sm">{{ child.nameFa }} / {{ child.nameEn }}</span>
          <div class="flex gap-1">
            <UButton icon="i-lucide-pencil" size="xs" variant="ghost" @click="openEdit(child)" />
            <UButton icon="i-lucide-trash" size="xs" color="error" variant="ghost" @click="confirmDelete(child)" />
          </div>
        </div>
      </div>
    </div>

    <UModal v-model:open="deleteModal">
      <template #content>
        <UCard>
          <template #header>
            <h3>{{ t('dashboard.confirmDelete.title') }}</h3>
          </template>
          <p>{{ t('dashboard.confirmDelete.category') }}</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="deleteModal = false" />
              <UButton :label="t('dashboard.actions.delete')" color="error" @click="deleteCategory" />
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
