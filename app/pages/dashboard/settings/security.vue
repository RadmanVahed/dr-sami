<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '@nuxt/ui'

const { t } = useI18n()

const makePasswordSchema = (tFn: typeof t) => z.object({
  current: z.string({
    error: tFn('validations.error')
  }).min(8, tFn('validations.minPassword')),
  new: z.string({
    error: tFn('validations.error')
  }).min(8, tFn('validations.minPassword'))
})

const passwordSchema = computed(() => makePasswordSchema(t))

type PasswordSchema = z.infer<ReturnType<typeof makePasswordSchema>>

const password = reactive<Partial<PasswordSchema>>({
  current: '',
  new: ''
})
const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: t('validations.uniquePassword') })
  }
  return errors
}
</script>

<template>
  <UPageCard :title="t('basic.password')" :description="t('dashboard.security.label')" variant="subtle">
    <UForm :schema="passwordSchema" :state="password" :validate="validate" class="flex flex-col gap-4 max-w-xs">
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

      <UButton :label="t('basic.save')" class="w-fit" type="submit" />
    </UForm>
  </UPageCard>
</template>
