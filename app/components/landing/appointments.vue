<script setup lang="ts">
const { data, pending, error } = useLazyFetch('/api/doctorTo');

const paziresh24 = useLazyFetch('/api/paziresh24')
console.log(paziresh24.data.value?.search?.result[1]);


const drToFreeTime = computed(() => {
  if (!data.value) {
    return 'درحال دریافت اولین نوبت خالی...'
  }
  if (!data.value.items.has_free_next_consultation_time) {
    return 'در حال حاضر دکتر نوبت خالی ندارد.'
  }
  return `${data.value.items.free_next_consultation_time.shamsi_date} ساعت ${data.value.items.free_next_consultation_time.time}`
})
const P24PlanFeatures = computed(() => {
  if (!paziresh24.data.value) {
    return [
      'درحال دریافت آمار مشاهده پروفایل...',
      'درحال دریافت میزان رضایت کاربران...',
      'درحال دریافت آدرس ...',
      'درحال دریافت زمان انتظار...'
    ];
  }
  return [
    {
      title: `${paziresh24.data.value?.search?.result[1].view} مشاهده پروفایل`,
    },
    {
      title: `${paziresh24.data.value?.search?.result[1].star}/5 از (${paziresh24.data.value?.search?.result[1].rates_count} نظر)`,
      icon: 'i-lucide-user'
    },
    {
      title: `${paziresh24.data.value?.search?.result[1].centers[0].name}`,
      icon: 'i-lucide-map-pin'
    },
    {
      title: `${paziresh24.data.value?.search?.result[1].waiting_time} انتظار`,
      icon: 'i-lucide-clock'
    }
  ];
});
const drToPlanFeatures = computed(() => {
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

</script>
<template>
  <UPricingPlan v-if="data" description="نوبت دهی آنلاین از طریق دکترتو" :features="drToPlanFeatures"
    :tagline="drToFreeTime" :button="{ label: 'رزرو نوبت' }" orientation="horizontal" variant="outline">
    <template #title>
      <div class="flex items-center gap-2">
        <UAvatar class="w-18 h-18 p-1" src="https://media.mehrnews.com/d/2024/09/24/3/5174849.jpg?ts=1727165357362" />
        <h1 class="text-xl">دکترتو</h1>
      </div>
    </template>
    <template #tagline>
      <span class="text-neutral-500 w-full flex justify-center">اولین نوبت آزاد دکتر</span>
      <h1 class="text-sm mt-2">{{ drToFreeTime }}</h1>
    </template>
  </UPricingPlan>
  <UPricingPlan v-if="data" tagline="دریافت نوبت" description="نوبت دهی آنلاین از طریق پذیرش 24"
    :features="P24PlanFeatures" :button="{ label: 'رزرو نوبت' }" orientation="horizontal" variant="outline">
    <template #title>
      <div class="flex items-center gap-2">
        <UAvatar class="w-18 h-18 p-1"
          src="https://play-lh.googleusercontent.com/2-wWgDz3w-qsVYQVdkMpN-JBPMCJr_-YVyJnKBm3qTqI9QN4WYxLrE3WWMjViNGCxZ0" />
        <h1 class="text-xl">پذیرش 24</h1>
      </div>
    </template>
  </UPricingPlan>
</template>
