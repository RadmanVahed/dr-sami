<script setup lang="ts">
const { t } = useI18n()
const { data, pending, error } = useLazyFetch('/api/doctorTo')
useHead({
  title: t('appointment.pageTitle'),
})
// ✅ رشته‌های زمان و وضعیت نوبت از ترجمه گرفته می‌شن
const drToFreeTime = computed(() => {
  if (!data.value) {
    return t('appointment.section.loadingFreeTime')
  }
  if (!data.value.items.has_free_next_consultation_time) {
    return t('appointment.section.noFreeTime')
  }
  return `${data.value.items.free_next_consultation_time.shamsi_date} ${t('basic.at')} ${data.value.items.free_next_consultation_time.time}`
})

// ✅ ویژگی‌های پلن نمایش بر اساس داده یا ترجمه‌ی پیش‌فرض
const drToPlanFeatures = computed(() => {
  if (!data.value) {
    return [
      t('appointment.features.loading.appointments'),
      t('appointment.features.loading.recommendations'),
      t('appointment.features.loading.address'),
      t('appointment.features.loading.waiting')
    ]
  }
  return [
    {
      title: t('appointment.features.successfulAppointments', {
        count: data.value.items.count_done_orders
      })
    },
    {
      title: t('appointment.features.userRecommendations', {
        percent: data.value.items.rate.percent
      }),
      icon: 'i-lucide-user'
    },
    {
      title: data.value.items.consultations[0].place.name,
      icon: 'i-lucide-map-pin'
    },
    {
      title: t('appointment.features.waitingTime', {
        time: data.value.items.presence_waiting_time.range
      }),
      icon: 'i-lucide-clock'
    }
  ]
})
</script>

<template>
  <UContainer  class="my-8">
    <UPricingPlan

    v-if="data"
    :description="t('appointment.description')"
    :features="drToPlanFeatures"
    :tagline="drToFreeTime"
    :button="{ label: t('appointment.buttonLabel') }"
    orientation="horizontal"
    variant="soft"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <UAvatar
          class="w-18 h-18 p-1"
          src="https://media.mehrnews.com/d/2024/09/24/3/5174849.jpg?ts=1727165357362"
        />
        <h1 class="text-xl">{{ t('appointment.section.title') }}</h1>
      </div>
    </template>

    <template #tagline>
      <span class="text-neutral-500 w-full flex justify-center">
        {{ t('appointment.section.taglineTitle') }}
      </span>
      <h1 class="text-sm mt-2">{{ drToFreeTime }}</h1>
    </template>
  </UPricingPlan>
  </UContainer>
</template>
