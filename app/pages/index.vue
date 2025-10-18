<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { withLeadingSlash } from 'ufo'
import type { ButtonProps, PageCardProps, PageGridProps } from '@nuxt/ui'
const route = useRoute()
const { locale, localeProperties } = useI18n()
const slug = computed(() => withLeadingSlash(String(locale.value)))

const { data: page } = await useAsyncData('page-' + locale.value, async () => {
  const l = locale.value as keyof Collections
  const content = await queryCollection(l).path(`/${l}/`).first()
  return content
}, {
  watch: [locale],
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})

const links = ref<ButtonProps[]>([
  {
    label: 'اطلاعات بیشتر و رزرو نوبت',
    color: 'neutral'
  }
])
const { data, pending, error } = useLazyFetch('/api/doctorTo');

const freeTime = computed(() => {
  if (!data.value) {
    return 'درحال دریافت اولین نوبت خالی...'
  }
  if (!data.value.items.has_free_next_consultation_time) {
    return 'در حال حاضر دکتر نوبت خالی ندارد.'
  }
  return `${data.value.items.free_next_consultation_time.shamsi_date} ساعت ${data.value.items.free_next_consultation_time.time}`
})

const planFeatures = computed(() => {
  if (!data.value) {
    return [
      'درحال دریافت آمار نوبت‌ها...',
      'درحال دریافت میزان پیشنهاد کاربران...',
      'درحال دریافت آدرس مطب...',
      'درحال دریافت زمان انتظار...'
    ];
  }
  return [
    {
      title: `${data.value.items.count_done_orders} نوبت موفق`,
    },
    {
      title: `${data.value.items.rate.percent}% پیشنهاد کاربران`,
      icon: 'i-lucide-user'
    },
    {
      title: `${data.value.items.consultations[0].place.name}`,
      icon: 'i-lucide-map-pin'
    },
    {
      title: `${data.value.items.presence_waiting_time.range} میانگین انتظار`,
      icon: 'i-lucide-clock'
    }
  ];
});
const cards = ref<PageCardProps[]>([
  {
    title: 'بازتوانی ریه',
    description: 'بازتوانی ریه شکل مدرن درمان بیماری مزمن ریوی است که هدف آن بهبود تناسب‌اندام و کیفیت زندگی است',
    to: '/docs/getting-started/integrations/icons'
  },
  {
    title: 'بازتوانی ریه',
    description: 'بازتوانی ریه شکل مدرن درمان بیماری مزمن ریوی است که هدف آن بهبود تناسب‌اندام و کیفیت زندگی است',
    to: '/docs/getting-started/integrations/fonts'
  },
  {
    title: 'بازتوانی ریه',
    description: 'بازتوانی ریه شکل مدرن درمان بیماری مزمن ریوی است که هدف آن بهبود تناسب‌اندام و کیفیت زندگی است',
    to: '/docs/getting-started/integrations/color-mode'
  }
])
const authors = ref([
  {
    name: 'دکتر رامین سامی',
    description: 'فوق تخصص ریه',
    avatar: {
      src: 'https://imgcdn.stablediffusionweb.com/2024/10/29/a450d65f-b789-416c-945a-4f2d19a15d23.jpg'
    },
    target: '_blank'
  }
])
const testimonials = ref([
  {
    user: {
      name: 'Evan You',
      description: 'Author of Vue.js and Vite',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You'
      }
    },
    quote: 'Nuxt on Cloudflare infra with minimal effort - this is huge!'
  },
  {
    user: {
      name: 'Igor Minar',
      description: 'Software Engineer at Cloudflare',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/216296?v=4',
        alt: 'Igor Minar'
      }
    },
    quote: 'I love the polish and the batteries-included approach. NuxtHub takes web framework and hosting integration to a new level!'
  },
  {
    user: {
      name: 'Charlie Hield',
      description: 'Senior Creative Technologist',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/527849?v=4',
        alt: 'Charlie Hield'
      }
    },
    quote: 'NuxtHub is hands down the easiest way to get a project from zero to production on the Cloudflare stack!'
  },
  {
    user: {
      name: 'Israel Ortuño',
      description: 'Co-founder of VueJobs',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/1769417?v=4',
        alt: 'Israel Ortuño'
      }
    },
    quote: 'I can\'t find an excuse to not go full-stack with Nuxt from now on. Ship fast the Nuxt way, zero config. Just plug & deploy.'
  },
  {
    user: {
      name: 'Fayaz Ahmed',
      description: 'Indie Hacker',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/15716057?v=4',
        alt: 'Fayaz Ahmed'
      }
    },
    quote: 'Took me less than 90 seconds to deploy an app with DB, KV, File storage and Caching, all on the edge with just a single command.'
  },
  {
    user: {
      name: 'Tommy J. Vedvik',
      description: 'UX Developer',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/48070?v=4',
        alt: 'Tommy J. Vedvik'
      }
    },
    quote: 'Nuxt is becoming the best framework for bootstrappers imo. NuxtHub is a layer on top of Cloudflare services for cheap & fast full-stack edge hosting.'
  },
  {
    user: {
      name: 'Dario Piotrowicz',
      description: 'Web Developer at Cloudflare',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/61631103?v=4',
        alt: 'Dario Piotrowicz'
      }
    },
    quote: 'I love how NuxtHub combines, amplifies and simplifies the Cloudflare tooling with the wide and mature Nuxt ecosystem. I cannot wait to see how it will evolve and expand in the future!'
  },
  {
    user: {
      name: 'Markus Oberlehner',
      description: 'Web Developer',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/6883314?v=4',
        alt: 'Markus Oberlehner'
      }
    },
    quote: 'Just deployed my first site to Cloudflare using NuxtHub. Very sleek experience!'
  },
  {
    user: {
      name: 'Anthony Fu',
      description: 'Core team Vue.js, Vite & Nuxt',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/11247099?v=4',
        alt: 'Anthony Fu'
      }
    },
    quote: 'It\'s amazing to be able to run a single command and get existing Nuxt project deployed on edge within minutes! It felt like unlocking the missing infrastructure and UI for Cloudflare, enhancing the developer experience in such an extraordinary way.'
  },
  {
    user: {
      name: 'Jonathan Beckman',
      description: 'Founder of GuaranTee Time',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/90707158?v=4',
        alt: 'Jonathan Beckman'
      }
    },
    quote: 'NuxtHub and Cloudflare are my go to for full stack apps. The DX is joyous and far superior to any other platform I\'ve used. My team is able to iterate quickly, and build beautiful, performant apps with ease.'
  },
  {
    user: {
      name: 'Eckhardt Dreyer',
      description: 'Lead Developer at YG',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/37825447?v=4',
        alt: 'Eckhardt Dreyer'
      }
    },
    quote: 'At YG, our team recently grew and that meant more seats on all the tools we use. Migrating our hosting workflow to NuxtHub not only took just a few minutes but saved us money from our previous provider. NuxtHub provides an excellent management layer on top of our infrastructure and we\'re super happy about the move!'
  }
])
</script>

<template>
  <UPage v-if="page" :dir="useDir().value">
    <LandingHero :dir="useDir().value" :page />
    <UPageSection :ui="{
      container: '!pt-0 w-full'
    }">
      <UCarousel dir="ltr" v-slot="{ item }" :dots="!$device.isDesktopOrTablet" :arrows="$device.isDesktopOrTablet" :ui="{ item: $device.isDesktopOrTablet ? 'basis-1/3': ''}" :items="cards" class="w-full mb-16">
        <div dir="rtl" class="p-4">
          <UPageCard v-bind="item">
          <img
            src="https://drardakiani.com/wp-content/webp-express/webp-images/uploads/2022/11/Asthma-Illustration.png.webp"
            alt="Tailwind CSS" class="w-22 h-18" />
        </UPageCard>
        </div>
      </UCarousel>

      <UPricingPlan v-if="data" description="نوبت دهی آنلاین از طریق دکترتو" :features="planFeatures"
        :tagline="freeTime" :button="{ label: 'رزرو نوبت' }" orientation="horizontal" variant="outline">
        <template #title>
          <div class="flex items-center gap-2">
            <UAvatar class="w-18 h-18 p-1"
              src="https://media.mehrnews.com/d/2024/09/24/3/5174849.jpg?ts=1727165357362" />
            <h1 class="text-xl">دکترتو</h1>
          </div>
        </template>
        <template #tagline>
          <span class="text-neutral-500">اولین نوبت آزاد دکتر:</span>
          <h1 class="text-sm mt-2">{{ freeTime }}</h1>
        </template>
      </UPricingPlan>
      <UPricingPlan v-if="data" description="نوبت دهی آنلاین از طریق پذیرش 24" :features="planFeatures"
        :tagline="freeTime" :button="{ label: 'رزرو نوبت' }" orientation="horizontal" variant="outline">
        <template #title>
          <div class="flex items-center gap-2">
            <UAvatar class="w-18 h-18 p-1"
              src="https://play-lh.googleusercontent.com/2-wWgDz3w-qsVYQVdkMpN-JBPMCJr_-YVyJnKBm3qTqI9QN4WYxLrE3WWMjViNGCxZ0" />
            <h1 class="text-xl">پذیرش 24</h1>
          </div>
        </template>
        <template #tagline>
          <span class="text-neutral-500">اولین نوبت آزاد دکتر:</span>
          <h1 class="text-sm mt-2">{{ freeTime }}</h1>
        </template>
      </UPricingPlan>
       <UCarousel dir="ltr" v-slot="{ item }" :dots="!$device.isDesktopOrTablet" :arrows="$device.isDesktopOrTablet" :ui="{ item: $device.isDesktopOrTablet ? 'basis-1/3': ''}" :items="[1,2,3]" class="w-full">
        <div dir="rtl">
           <UBlogPost :authors="authors" title="برونشیت چیست و چگونه درمان می‌شود؟"
          image="https://drardakiani.com/wp-content/webp-express/webp-images/uploads/2022/12/pic-205464-1563171556-compressed.jpg.webp"
          date="2024-11-25" />
        </div>
       </UCarousel>
      <UPageGrid>

      </UPageGrid>
      <!-- <LandingAbout :page /> -->
      <!-- <LandingWorkExperience :page /> -->
    </UPageSection>
    <!-- <LandingBlog :page /> -->
    <!-- <LandingTestimonials :data /> -->
    <LandingFAQ :page />
  </UPage>
</template>
