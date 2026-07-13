<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const dir = useDir()

// Invert header direction vs page locale so FA/EN sides mirror each other.
const headerDirClass = computed(() => (dir.value === 'rtl' ? 'ltr' : 'rtl'))
// Slideover opens from the locale start edge (left in EN, right in FA).
const menuSide = computed(() => (dir.value === 'rtl' ? 'right' : 'left'))
// Keep the toggle with #right controls. Under the inverted header dir that
// places the menu on the visual start, immediately before ColorMode.
const toggleSide = 'right'
// Invert slideover header vs page locale (teleported, so no parent dir).
// EN: controls+close on the left (close leftmost), logo on the right.
// FA: logo on the left, close rightmost.
const headerUi = computed(() => ({
  right: 'gap-0',
  title: 'gap-0',
  left: 'gap-0',
  header: dir.value === 'rtl' ? 'ltr' : 'rtl'
}))
</script>


<template>
  <div :class="headerDirClass">
    <UHeader
      mode="slideover"
      :toggle-side="toggleSide"
      :ui="headerUi"
      :menu="{ side: menuSide }"
    >
      <template #title>
        <ClientOnly>
          <NuxtLink :to="localePath('/')">
            <div
              class="flex items-center gap-2"
              :class="dir === 'rtl' ? 'flex-row-reverse' : ''"
              dir="ltr"
            >
              <UAvatar alt="logo" src="/images/logo.png" />
              <span class="text-xl">{{ t('basic.dr') }}</span>
            </div>
          </NuxtLink>
        </ClientOnly>
      </template>

      <UNavigationMenu
        variant="link"
        :dir="dir"
        :items="[
          { label: t('basic.services'), to: localePath('/services') },
          { label: t('navigation.appointment'), to: localePath('/appointment') },
          { label: t('navigation.medicalEducation'), to: localePath('/education') },
          { label: t('navigation.patientEducation'), to: localePath('/patient-education') },
          { label: t('navigation.aboutDoctor'), to: localePath('/about') },
          { label: t('navigation.contact'), to: localePath('/contact') }
        ]"
        class="hidden md:flex"
      />

      <template #body>
        <UNavigationMenu
          :dir="dir"
          :items="[
            { label: t('basic.services'), to: localePath('/services') },
            { label: t('navigation.appointment'), to: localePath('/appointment') },
            { label: t('navigation.medicalEducation'), to: localePath('/education') },
            { label: t('navigation.patientEducation'), to: localePath('/patient-education') },
            { label: t('navigation.aboutDoctor'), to: localePath('/about') },
            { label: t('navigation.contact'), to: localePath('/contact') }
          ]"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>

      <template #right>
        <LanguageSwitcher />
        <ColorModeButton />
      </template>
    </UHeader>
  </div>
</template>
