<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

setPageLayout('auth')

const fields: AuthFormField[] = [{
  name: 'username',
  type: 'text',
  label: 'username',
  placeholder: 'Enter your username',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

const schema = z.object({
  username: z.string({
    message:'username is required'
  }),
  password: z.string({
    message:'Password is required'
  }).min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>
  const localePath = useLocalePath()
  const router = useRouter()
function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  router.push(localePath('/dashboard'))
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>

