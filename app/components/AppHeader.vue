<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>

  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10"
    :class="$device.isDesktop ? '' : 'w-5/6'">
    <UNavigationMenu :dir="useDir().value" popover :items="useNavLinks()" variant="link" color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full gap-0 px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }">
      <template #list-trailing>
        <div class="flex items-center gap-1" :class="$device.isDesktopOrTablet ? 'gap-2 mx-2' : ''">
          <UButton :label="t('navigation.login')" :to="localePath('/auth')" />
          <div class="flex items-center">
            <ColorModeButton />
            <LanguageSwitcher />
          </div>
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>
