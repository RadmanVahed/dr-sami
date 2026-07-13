<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, FormError } from '@nuxt/ui'

const { t } = useI18n()
const toast = useToast()
const saving = ref(false)

const schema = computed(() => z.object({
  current: z.string().min(1, t('validations.error')),
  new: z.string().min(4, t('validations.short'))
}))

type Schema = z.infer<ReturnType<typeof schema.value>>

const password = reactive<Partial<Schema>>({
  current: '',
  new: ''
})

const validate = (state: Partial<Schema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: t('validations.uniquePassword') })
  }
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  saving.value = true
  try {
    await $fetch('/api/admin/password', {
      method: 'PUT',
      body: {
        currentPassword: event.data.current,
        newPassword: event.data.new
      }
    })
    toast.add({ title: t('dashboard.messages.passwordChanged'), color: 'success' })
    password.current = ''
    password.new = ''
  } catch (err: any) {
    toast.add({
      title: t('dashboard.messages.saveError'),
      description: err?.data?.statusMessage,
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <UDashboardPanel id="security">
    <template #header>
      <UDashboardNavbar :title="t('dashboard.menu.settings')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4">
        <UPageCard
          :title="t('basic.password')"
          :description="t('dashboard.security.label')"
          variant="subtle"
          class="max-w-lg"
        >
          <UForm
            :schema="schema"
            :state="password"
            :validate="validate"
            class="flex flex-col gap-4"
            @submit="onSubmit"
          >
            <UFormField name="current" :label="t('basic.current')">
              <UInput
                v-model="password.current"
                type="password"
                :placeholder="t('dashboard.security.currentPassword')"
                class="w-full"
              />
            </UFormField>

            <UFormField name="new" :label="t('basic.new')">
              <UInput
                v-model="password.new"
                type="password"
                :placeholder="t('dashboard.security.newPassword')"
                class="w-full"
              />
            </UFormField>

            <UButton
              :label="t('basic.save')"
              type="submit"
              :loading="saving"
              class="w-fit"
            />
          </UForm>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
