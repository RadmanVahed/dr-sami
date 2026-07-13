<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

const { t } = useI18n()
const toast = useToast()
const localePath = useLocalePath()
const router = useRouter()

const fields = computed(() => [{
  name: 'username',
  type: 'text' as const,
  label: t('dashboard.auth.username'),
  placeholder: t('dashboard.auth.usernamePlaceholder'),
  required: true
}, {
  name: 'password',
  label: t('dashboard.auth.password'),
  type: 'password' as const,
  placeholder: t('dashboard.auth.passwordPlaceholder'),
  required: true
}])

const schema = computed(() => z.object({
  username: z.string().min(1, t('validations.error')),
  password: z.string().min(1, t('validations.error'))
}))

type Schema = {
  username: string
  password: string
}

const loading = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data
    })
    toast.add({ title: t('dashboard.auth.loginSuccess'), color: 'success' })
    router.push(localePath('/dashboard'))
  } catch {
    toast.add({ title: t('dashboard.auth.loginError'), color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-[60vh]">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :title="t('dashboard.auth.title')"
        :description="t('dashboard.auth.description')"
        icon="i-lucide-shield-check"
        :fields="fields"
        :loading="loading"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
