<script setup lang="ts">
export type AboutHighlight = {
  icon: string
  label: string
}

export type AboutReason = {
  title: string
  description: string
  points: string[]
}

export type AboutSpecialty = {
  title: string
  items: string[]
  serviceSlug?: string
}

export type AboutPageContent = {
  title: string
  description: string
  intro: string
  image: { src: string, alt: string }
  sections: {
    credentials: string
    whyChoose: string
    highlights: string
    specialties: string
  }
  credentials: string[]
  highlights: AboutHighlight[]
  reasons: AboutReason[]
  specialtiesIntro: string
  specialties: AboutSpecialty[]
  cta: {
    services: string
    appointment: string
    subtitle: string
    viewService: string
    downloadResume?: string
  }
}

const props = defineProps<{
  content: AboutPageContent
}>()

const localePath = useLocalePath()
const dir = useDir()
const servicesTrailingIcon = computed(() =>
  dir.value === 'rtl' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'
)

const introParagraphs = computed(() =>
  props.content.intro
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
)

function servicePath(slug?: string) {
  if (!slug) {
    return undefined
  }
  return localePath(`/service/${slug}`)
}

function staggerDelay(index: number, base = 0) {
  return base + index * 0.08
}
</script>

<template>
  <div class="about-doctor">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-default/60 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      <UContainer class="py-10 sm:py-14 lg:py-16">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <AboutReveal class="order-2 space-y-5 lg:order-1" :y="20">
            <UBadge color="primary" variant="subtle" size="md" class="w-fit">
              {{ content.description }}
            </UBadge>
            <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
              {{ content.title }}
            </h1>
            <p
              v-for="(paragraph, index) in introParagraphs"
              :key="index"
              class="text-base leading-relaxed text-muted sm:text-lg"
            >
              {{ paragraph }}
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <UButton
                :to="localePath('/appointment')"
                size="lg"
                color="primary"
                trailing-icon="i-lucide-calendar"
                :label="content.cta.appointment"
              />
              <UButton
                :to="localePath('/services')"
                size="lg"
                color="neutral"
                variant="outline"
                :trailing-icon="servicesTrailingIcon"
                :label="content.cta.services"
              />
              <UButton
                v-if="content.cta.downloadResume"
                to="/files/resume.pdf"
                target="_blank"
                size="lg"
                color="neutral"
                variant="soft"
                trailing-icon="i-lucide-file-down"
                :label="content.cta.downloadResume"
              />
            </div>
          </AboutReveal>

          <AboutReveal class="order-1 flex justify-center lg:order-2" :delay="0.12" :y="28">
            <div class="relative">
              <div class="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <NuxtImg
                :src="content.image.src"
                :alt="content.image.alt"
                width="480"
                height="560"
                loading="eager"
                class="relative max-h-[28rem] w-full max-w-sm rounded-2xl object-cover shadow-xl ring-1 ring-default/40 sm:max-w-md"
              />
            </div>
          </AboutReveal>
        </div>
      </UContainer>
    </section>

    <!-- Highlights -->
    <section class="border-b border-default/40 bg-elevated/30">
      <UContainer class="py-8 sm:py-10">
        <h2 class="sr-only">
          {{ content.sections.highlights }}
        </h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <AboutReveal
            v-for="(item, index) in content.highlights"
            :key="index"
            :delay="staggerDelay(index, 0.05)"
            :y="16"
          >
            <div
              class="flex h-full flex-col items-center gap-2 rounded-xl border border-default/50 bg-default/60 p-4 text-center shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div class="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UIcon :name="item.icon" class="size-5" />
              </div>
              <span class="text-sm font-medium text-highlighted">
                {{ item.label }}
              </span>
            </div>
          </AboutReveal>
        </div>
      </UContainer>
    </section>

    <!-- Credentials -->
    <UPageSection
      :title="content.sections.credentials"
      :ui="{
        title: 'text-2xl font-bold sm:text-3xl',
        container: 'py-10 sm:py-12'
      }"
    >
      <AboutReveal :delay="0.05">
        <ul class="grid gap-3 sm:grid-cols-1 lg:max-w-3xl">
          <AboutReveal
            v-for="(item, index) in content.credentials"
            :key="index"
            :delay="staggerDelay(index, 0.1)"
            :y="12"
            class="block"
          >
            <li class="flex gap-3 rounded-xl border border-default/50 bg-elevated/40 px-4 py-3.5">
              <UIcon name="i-lucide-graduation-cap" class="mt-0.5 size-5 shrink-0 text-primary" />
              <span class="text-sm leading-relaxed text-muted sm:text-base">{{ item }}</span>
            </li>
          </AboutReveal>
        </ul>
      </AboutReveal>
    </UPageSection>

    <!-- Why choose -->
    <UPageSection
      :title="content.sections.whyChoose"
      :ui="{
        title: 'text-2xl font-bold sm:text-3xl',
        container: 'py-10 sm:py-12 bg-muted/20 rounded-2xl'
      }"
    >
      <AboutReveal :delay="0.05">
        <div class="grid gap-5 md:grid-cols-2">
          <AboutReveal
            v-for="(reason, index) in content.reasons"
            :key="index"
            :delay="staggerDelay(index, 0.08)"
            class="h-full"
          >
            <UPageCard
              variant="subtle"
              class="h-full"
              :ui="{ container: 'gap-3' }"
            >
              <div class="flex items-start gap-3">
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {{ index + 1 }}
                </span>
                <div class="min-w-0 flex-1 space-y-2">
                  <h3 class="text-lg font-semibold text-highlighted">
                    {{ reason.title }}
                  </h3>
                  <p class="text-sm leading-relaxed text-muted">
                    {{ reason.description }}
                  </p>
                  <ul v-if="reason.points.length" class="space-y-2 pt-1">
                    <li
                      v-for="(point, pointIndex) in reason.points"
                      :key="pointIndex"
                      class="flex gap-2 text-sm text-muted"
                    >
                      <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </UPageCard>
          </AboutReveal>
        </div>
      </AboutReveal>
    </UPageSection>

    <!-- Specialties -->
    <UPageSection
      :title="content.sections.specialties"
      :description="content.specialtiesIntro"
      :ui="{
        title: 'text-2xl font-bold sm:text-3xl',
        description: 'mt-3 max-w-3xl text-base leading-relaxed text-muted',
        container: 'py-10 sm:py-14'
      }"
    >
      <AboutReveal :delay="0.05">
        <div class="grid gap-4 sm:grid-cols-2">
          <AboutReveal
            v-for="(specialty, index) in content.specialties"
            :key="index"
            :delay="staggerDelay(index, 0.06)"
            class="h-full"
          >
            <UPageCard
              variant="subtle"
              class="group h-full transition hover:border-primary/25 hover:shadow-md"
              :to="servicePath(specialty.serviceSlug)"
              :ui="{ title: 'text-base font-semibold', container: 'gap-3' }"
            >
              <template #title>
                <span class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-stethoscope"
                    class="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  <span>{{ specialty.title }}</span>
                </span>
              </template>

              <ul class="space-y-2">
                <li
                  v-for="(specialtyItem, itemIndex) in specialty.items"
                  :key="itemIndex"
                  class="flex gap-2 text-sm text-muted"
                >
                  <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-primary/80" />
                  <span>{{ specialtyItem }}</span>
                </li>
              </ul>

              <template v-if="specialty.serviceSlug" #footer>
                <UButton
                  :to="servicePath(specialty.serviceSlug)"
                  variant="soft"
                  color="primary"
                  size="sm"
                  class="relative z-10 w-full justify-center"
                  block
                  :trailing-icon="servicesTrailingIcon"
                  :label="content.cta.viewService"
                />
              </template>
            </UPageCard>
          </AboutReveal>
        </div>
      </AboutReveal>
    </UPageSection>

    <!-- Bottom CTA -->
    <section class="border-t border-default/60 bg-primary/5">
      <UContainer class="py-12 text-center sm:py-14">
        <AboutReveal :y="16">
          <h2 class="text-xl font-semibold text-highlighted sm:text-2xl">
            {{ content.cta.appointment }}
          </h2>
          <p class="mx-auto mt-2 max-w-lg text-sm text-muted sm:text-base">
            {{ content.cta.subtitle }}
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <UButton
              :to="localePath('/appointment')"
              size="lg"
              color="primary"
              trailing-icon="i-lucide-calendar"
              :label="content.cta.appointment"
            />
            <UButton
              :to="localePath('/services')"
              size="lg"
              color="neutral"
              variant="soft"
              :label="content.cta.services"
            />
            <UButton
              v-if="content.cta.downloadResume"
              to="/files/resume.pdf"
              target="_blank"
              size="lg"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-file-down"
              :label="content.cta.downloadResume"
            />
          </div>
        </AboutReveal>
      </UContainer>
    </section>
  </div>
</template>
