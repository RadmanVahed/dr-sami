<script setup lang="ts">
const { footer, global } = useAppConfig()
 const { t , locale} = useI18n()

const localePath = useLocalePath()
defineProps<{
  page: any
}>()
const dir = useDir().value
</script>

<template>
  <UPageHero :ui="{
    headline: 'flex items-center justify-center',
    title: 'text-shadow-md',
    links: 'mt-4 flex-col justify-center items-center',
    description:'text-pretty'
  }">
    <template #headline>
      <Motion :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }" :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }" :transition="{
          duration: 0.6,
          delay: 0.1
        }">
      <NuxtImg class="rounded-2xl" :src="`/images/hero-${locale}.png`" />
      </Motion>
    </template>

    <!-- <template #title>
      <div :dir="dir">
        <Motion :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }" :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }" :transition="{
          duration: 0.6,
          delay: 0.1
        }">
          {{ page.seo.title }}
        </Motion>
      </div>
    </template> -->
    <!-- <template #description>
      <div :dir="dir">
        <Motion :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }" :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }" :transition="{
          duration: 0.6,
          delay: 0.3
        }">
          {{ page.description }}
        </Motion>
      </div>
    </template> -->

    <template #links>
      <Motion :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }" :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }" :transition="{
          duration: 0.6,
          delay: 0.5
        }">
        <div v-if="page.body?.hero.links" class="flex items-center gap-2">
          <UButton :label="t('basic.onlineAppointment')" size="xl" :to="localePath('/appointment')" color="info" />
          <Motion v-for="(link, index) of footer?.links" :key="index" :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }" :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }" :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }">
          <UButton v-bind="{ size: 'xl', color: 'neutral', variant: 'ghost', ...link }" />
        </Motion>
        </div>
      </Motion>
    </template>

    <!-- <UMarquee pause-on-hover class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]">
      <Motion v-for="(img, index) in page.body.hero.images" :key="index" :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }" :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }" :transition="{
          duration: 0.6,
          delay: index * 0.1
        }">
        <NuxtImg width="234" height="234" class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'" v-bind="img" />
      </Motion>
    </UMarquee> -->
  </UPageHero>
</template>
