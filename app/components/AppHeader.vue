<script setup lang="ts">
</script>

<template>
  <div class="w-full flex justify-center sticky top-4 z-10">
    <div>
    <UNavigationMenu :dir="useDir().value" popover :items="useNavLinks()" variant="link" color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full gap-0 px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }">
      <template #list-trailing>
        <ColorModeButton />
        <LanguageSwitcher/>
      </template>
    </UNavigationMenu>
  </div>
  </div>
</template>
