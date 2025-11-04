<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from '#imports'
const { t, locales } = useI18n()
const localePath = useLocalePath()
const initialItems = [
  {
    label: t('basic.services'), to: '#services'
  },
  {
    label: t('navigation.medicalEducation'), to: '#medical-education'
  },
  {
    label: t('navigation.patientEducation'), to: '#patient-education'
  },
  {
    label: t('navigation.aboutDoctor'), to: '#about'
  }
]

const activeSection = ref<string | null>(null)
let observer: IntersectionObserver | null = null
const route = useRoute()


const scrollTo = (hash: string) => {
  const element = document.querySelector(hash)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth'
    })
    history.replaceState(null, '', hash)
  }
}

const items = computed<NavigationMenuItem[]>(() =>
  initialItems.map(item => ({
    label: item.label,
    to: item.to,
    active: activeSection.value === item.to.substring(1),
    click: (event: MouseEvent) => {
      event.preventDefault()
      scrollTo(item.to)
    }
  }))
)

onMounted(() => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }

  observer = new IntersectionObserver((entries) => {
    let bestEntry: IntersectionObserverEntry | null = null;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!bestEntry) {
          bestEntry = entry;
        } else if (entry.intersectionRatio > bestEntry.intersectionRatio) {
          bestEntry = entry;
        }
      }
    }
    if (bestEntry) {
      const newActiveSection = bestEntry.target.id
      if (activeSection.value !== newActiveSection) {
        activeSection.value = newActiveSection
        history.replaceState(null, '', `#${newActiveSection}`)
      }
    } else {
      const isAnySectionManuallyActive = route.hash && initialItems.some(item => item.to === route.hash);
      if (!isAnySectionManuallyActive || window.scrollY < 200) { // شرط کمکی برای بالای صفحه
        if (activeSection.value) {
          activeSection.value = null
          history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      }
    }
  }, options)

  initialItems.forEach(item => {
    const element = document.querySelector(item.to)
    if (element) {
      observer?.observe(element)
    }
  })

  if (route.hash) {
    setTimeout(() => {
      scrollTo(route.hash);
    }, 100);
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>


<template>
  <UHeader mode="drawer" :ui="{ right: 'gap-0', title: 'gap-0', left: 'gap-0' }" :menu="{ direction: 'top' }">
    <template #title>
      <ClientOnly>
 <NuxtLink :to="localePath('/')">
         <span class="text-xl">دکتر رامین سامی</span>
      </NuxtLink>
      </ClientOnly>

    </template>

    <UNavigationMenu variant="link" dir="rtl" :items="items" class="hidden md:flex" />

    <template #body>
      <UNavigationMenu dir="rtl" :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <LanguageSwitcher />
      <ColorModeButton />
    </template>
  </UHeader>
</template>
