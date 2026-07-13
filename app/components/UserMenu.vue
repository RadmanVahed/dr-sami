<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const { data: session } = await useFetch('/api/auth/session')

const user = computed(() => ({
  name: session.value?.user?.username || 'Admin',
  avatar: {
    src: '/images/profilePic3.png',
    alt: 'Admin'
  }
}))

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  router.push(localePath('/auth'))
}

const items = computed<DropdownMenuItem[][]>(() => ([[{
  type: 'label',
  label: user.value.name,
  avatar: user.value.avatar
}], [{
  label: t('dashboard.menu.settings'),
  icon: 'i-lucide-settings',
  to: localePath('/dashboard/settings/security')
}], [{
  label: t('dashboard.menu.logout'),
  icon: 'i-lucide-log-out',
  onSelect: logout
}]]))
</script>

<template>
  <UDropdownMenu
    :dir="useDir().value"
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{ trailingIcon: 'text-dimmed' }"
    />
  </UDropdownMenu>
</template>
