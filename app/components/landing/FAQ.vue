<script setup lang="ts">

const props = defineProps<{
  page: any
}>()

const items = computed(() => {
  return props.page.body.faq?.categories.map((faq:any) => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions
    }
  })
})

const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger: 'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'truncate'
}
</script>

<template>
  <UPageSection
   :dir="useDir().value"
    :title="page.body.faq.title"
    :description="page.body.faq.description"
    :ui="{
      container: 'px-0 !pt-0 gap-4 sm:gap-4',
      title: ' text-xl sm:text-xl lg:text-2xl font-medium',
      description: ' mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UTabs
      :items
      orientation="horizontal"
       :dir="useDir().value"
      :ui
    >
      <template #content="{ item }">
        <UAccordion
         :dir="useDir().value"
          trailing-icon="lucide:plus"
          :items="item.questions"
          :unmount-on-hide="false"
          :ui="{
            item: 'border-none',
            trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
            trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted'
          }"
        >
          <template #body="{ item: _item }">
            <MDC
              :value="_item.content ?? ''"
              unwrap="p"
              class="px-4"
            />
          </template>
        </UAccordion>
      </template>
    </UTabs>
  </UPageSection>
</template>
