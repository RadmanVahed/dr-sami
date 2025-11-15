<script setup lang="ts">
import { z } from 'zod'
import type { AuthFormField, FormSubmitEvent } from '#ui/types'

const { t } = useI18n()

// ✅ تعریف Schema با متن‌های ترجمه‌شده
const schema = z.object({
  fullname: z
    .string(t('contact.form.fields.fullname.validation.required'))
    .min(3, t('contact.form.fields.fullname.validation.invalid')),
  phone: z
    .string(t('contact.form.fields.phone.validation.required'))
    .min(11, t('contact.form.fields.phone.validation.min'))
    .max(11, t('contact.form.fields.phone.validation.max')),
  subject: z
    .string(t('contact.form.fields.subject.validation.required'))
    .nonempty(t('contact.form.fields.subject.validation.required'))
})

useHead({
  title: t('contact.pageTitle')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  fullname: undefined,
  phone: undefined,
  subject: undefined
})

// ✅ تعریف فیلدهای فرم با ترجمه‌ها
const fields: AuthFormField[] = [
  {
    name: 'fullname',
    label: t('contact.form.fields.fullname.label'),
    type: 'text',
    placeholder: t('contact.form.fields.fullname.placeholder'),
    required: true
  },
  {
    name: 'phone',
    label: t('contact.form.fields.phone.label'),
    type: 'text',
    placeholder: t('contact.form.fields.phone.placeholder'),
    required: true
  },
  {
    name: 'subject',
    label: t('contact.form.fields.subject.label'),
    type: 'text',
    placeholder: t('contact.form.fields.subject.placeholder'),
    required: true
  }
]

const toast = useToast()

// ✅ هندل ارسال فرم
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: t('contact.form.toast.success.title'),
    description: t('contact.form.toast.success.description'),
    color: 'success'
  })
  console.log(event.data)
}
</script>

<template>
  <UContainer :dir="useDir().value">
    <div class="flex flex-col items-center justify-center gap-4 p-16 pb-0">
      <UPageCard variant="naked" class="w-full max-w-2xl">
        <UAuthForm :schema="schema" :submit="{ label: t('contact.form.submitLabel') }" :title="t('contact.title')"
          :description="t('contact.description')" icon="i-lucide-mail" :fields="fields" @submit="onSubmit" />
      </UPageCard>
    </div>
  </UContainer>
</template>
