<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>


<template>
  <UHeader mode="drawer" :ui="{ right: 'gap-0', title: 'gap-0', left: 'gap-0' }" :menu="{ direction: 'top' }">
    <template #title>
      <ClientOnly>
        <NuxtLink :to="localePath('/')">
          <div :class="'flex gap-2 ' + [useDir().value == 'rtl' ? 'items-center':'flex-row-reverse items-end']">
            <span class="text-xl">{{ t('basic.dr') }}</span>
            <UAvatar alt="logo" src="/images/logo.png" />
          </div>
        </NuxtLink>
      </ClientOnly>

    </template>

    <UNavigationMenu variant="link" :dir="useDir().value" :items="[
      { label: t('basic.services'), to: localePath('/services') },
      { label: t('navigation.appointment'), to: localePath('/appointment') },
      { label: t('navigation.medicalEducation'), to: localePath('/education') },
      { label: t('navigation.patientEducation'), to: localePath('/patient-education') },
      { label: t('navigation.aboutDoctor'), to: localePath('/about') },
      { label: t('navigation.contact'), to: localePath('/contact') }
    ]" class="hidden md:flex" />

    <template #body>
      <UNavigationMenu :dir="useDir().value" :items="[
        { label: t('basic.services'), to: localePath('/services') },
        { label: t('navigation.appointment'), to: localePath('/appointment') },
        { label: t('navigation.medicalEducation'), to: '/' },
        { label: t('navigation.patientEducation'), to: '/' },
        { label: t('navigation.aboutDoctor'), to: localePath('/about') },
        { label: t('navigation.contact'), to: localePath('/contact') }
      ]" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <LanguageSwitcher />
      <ColorModeButton />
    </template>
  </UHeader>
</template>
