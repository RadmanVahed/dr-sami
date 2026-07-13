<script setup lang="ts">
import type { Faq, Category } from '~/types/content'

const { t } = useI18n()
const toast = useToast()

const selectedCategoryId = ref<number | null>(null)
const showFaqForm = ref(false)
const editingFaq = ref<Faq | null>(null)
const deleteModal = ref(false)
const faqToDelete = ref<Faq | null>(null)

const faqForm = reactive({
  questionFa: '',
  questionEn: '',
  answerFa: '',
  answerEn: '',
  sortOrder: 0
})

const { data: categories, refresh: refreshCategories } = await useFetch<Category[]>('/api/admin/categories', {
  query: { section: 'faq' }
})

const { data: faqs, refresh: refreshFaqs } = await useFetch<Faq[]>('/api/admin/faqs', {
  query: computed(() => selectedCategoryId.value ? { categoryId: selectedCategoryId.value } : {})
})

watch(categories, (cats) => {
  if (cats?.length && !selectedCategoryId.value) {
    selectedCategoryId.value = cats[0].id
  }
}, { immediate: true })

const categoryOptions = computed(() =>
  (categories.value || []).map(c => ({
    label: `${c.nameFa} / ${c.nameEn}`,
    value: c.id
  }))
)

function resetFaqForm() {
  faqForm.questionFa = ''
  faqForm.questionEn = ''
  faqForm.answerFa = ''
  faqForm.answerEn = ''
  faqForm.sortOrder = 0
}

function openCreateFaq() {
  editingFaq.value = null
  resetFaqForm()
  showFaqForm.value = true
}

function openEditFaq(faq: Faq) {
  editingFaq.value = faq
  faqForm.questionFa = faq.questionFa
  faqForm.questionEn = faq.questionEn
  faqForm.answerFa = faq.answerFa
  faqForm.answerEn = faq.answerEn
  faqForm.sortOrder = faq.sortOrder
  showFaqForm.value = true
}

async function saveFaq() {
  if (!selectedCategoryId.value) return

  const payload = {
    categoryId: selectedCategoryId.value,
    questionFa: faqForm.questionFa,
    questionEn: faqForm.questionEn,
    answerFa: faqForm.answerFa,
    answerEn: faqForm.answerEn,
    sortOrder: faqForm.sortOrder
  }

  try {
    if (editingFaq.value) {
      await $fetch(`/api/admin/faqs/${editingFaq.value.id}`, { method: 'PUT', body: payload })
    } else {
      await $fetch('/api/admin/faqs', { method: 'POST', body: payload })
    }
    toast.add({ title: t('dashboard.messages.saveSuccess'), color: 'success' })
    showFaqForm.value = false
    refreshFaqs()
  } catch {
    toast.add({ title: t('dashboard.messages.saveError'), color: 'error' })
  }
}

function confirmDeleteFaq(faq: Faq) {
  faqToDelete.value = faq
  deleteModal.value = true
}

async function deleteFaq() {
  if (!faqToDelete.value) return
  try {
    await $fetch(`/api/admin/faqs/${faqToDelete.value.id}`, { method: 'DELETE' })
    toast.add({ title: t('dashboard.messages.deleteSuccess'), color: 'success' })
    deleteModal.value = false
    faqToDelete.value = null
    refreshFaqs()
  } catch {
    toast.add({ title: t('dashboard.messages.deleteError'), color: 'error' })
  }
}

function onCategoriesChanged() {
  refreshCategories()
  refreshFaqs()
}
</script>

<template>
  <UDashboardPanel id="faq">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.faq')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton
            :label="t('dashboard.faq.add')"
            icon="i-lucide-plus"
            :disabled="!selectedCategoryId"
            @click="openCreateFaq"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid gap-6 p-4 lg:grid-cols-2">
        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t('dashboard.categories.title') }}</h3>
          </template>
          <DashboardCategoryManager section="faq" @vue:updated="onCategoriesChanged" />
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between gap-4">
              <h3 class="font-semibold">{{ t('dashboard.faq.title') }}</h3>
              <USelectMenu
                v-model="selectedCategoryId"
                :items="categoryOptions"
                value-key="value"
                class="min-w-48"
              />
            </div>
          </template>

          <UCard v-if="showFaqForm" class="mb-4 p-4">
            <div class="space-y-3">
              <UInput v-model="faqForm.questionFa" :placeholder="t('dashboard.faq.questionFa')" />
              <UInput v-model="faqForm.questionEn" :placeholder="t('dashboard.faq.questionEn')" dir="ltr" />
              <UTextarea v-model="faqForm.answerFa" :placeholder="t('dashboard.faq.answerFa')" :rows="3" />
              <UTextarea v-model="faqForm.answerEn" :placeholder="t('dashboard.faq.answerEn')" :rows="3" dir="ltr" />
              <div class="flex gap-2">
                <UButton :label="t('basic.save')" @click="saveFaq" />
                <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="showFaqForm = false" />
              </div>
            </div>
          </UCard>

          <UAccordion
            :items="(faqs || []).map(f => ({
              label: f.questionFa,
              content: f.answerFa
            }))"
            class="w-full"
          >
            <template #default="{ item, index }">
              <div class="flex w-full items-center justify-between">
                <span>{{ item.label }}</span>
                <div class="flex gap-1" @click.stop>
                  <UButton
                    icon="i-lucide-pencil"
                    size="xs"
                    variant="ghost"
                    @click="openEditFaq((faqs || [])[index])"
                  />
                  <UButton
                    icon="i-lucide-trash"
                    size="xs"
                    color="error"
                    variant="ghost"
                    @click="confirmDeleteFaq((faqs || [])[index])"
                  />
                </div>
              </div>
            </template>
          </UAccordion>
        </UCard>
      </div>

      <UModal v-model:open="deleteModal">
        <template #content>
          <UCard>
            <template #header>
              <h3>{{ t('dashboard.confirmDelete.title') }}</h3>
            </template>
            <p>{{ t('dashboard.confirmDelete.faq') }}</p>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton :label="t('dashboard.form.cancel')" variant="ghost" @click="deleteModal = false" />
                <UButton :label="t('dashboard.actions.delete')" color="error" @click="deleteFaq" />
              </div>
            </template>
          </UCard>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
