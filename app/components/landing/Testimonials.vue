<script setup lang="ts">
const prop = defineProps<{
  data: any
}>()
interface RateType {
  first_name:string,
  comment_to_doctor:string
}
const rates = computed<RateType[]>(() => {
  if (!prop.data) {
    return []
  }
  console.log(prop.data);

  return prop.data.items.latest_reactions
})
</script>

<template>
  <UPageSection dir="ltr" :ui="{
    container: 'px-0 !pt-0'
  }">
    <UCarousel v-slot="{ item }" :items="rates" :autoplay="{ delay: 4000 }" class="w-full max-w-xs mx-auto"  dots>
      <UPageCard
      dir="rtl"
      v-if="item"
    :title="item.first_name"
    :description="item.comment_to_doctor"
  />
    </UCarousel>
  </UPageSection>
</template>
