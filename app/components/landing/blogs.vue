<script setup lang="ts">
const dir = useDir().value
const { isDesktopOrTablet } = useDevice()

// تعریف نویسندگان - این آرایه می‌تواند به صورت سراسری تعریف شود
const authors = [
  {
    name: 'دکتر [نام پزشک]',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=dr-profile', // آدرس عکس پروفایل پزشک
      alt: 'تصویر پروفایل دکتر'
    },
    to: '/about' // لینک به صفحه "درباره پزشک"
  }
]

// داده‌های نمونه برای مقالات وبلاگ
const blogPosts = [
  {
    slug: '/blog/bronchitis-treatment', // آدرس یکتای مقاله
    title: 'برونشیت چیست و چگونه درمان می‌شود؟',
    description: 'برونشیت، التهاب لوله‌های برونش در ریه‌ها، یکی از شایع‌ترین علل سرفه است. در این مقاله به بررسی علائم، دلایل و جدیدترین روش‌های درمانی آن می‌پردازیم.',
    image: {
      src: 'https://images.unsplash.com/photo-1550614004-eFFA72605asz?q=80&w=1920&auto=format&fit=crop',
      alt: 'تصویر میکروسکوپی از ریه انسان'
    },
    date: '2025-10-15',
    authors
  },
  {
    slug: '/blog/managing-asthma',
    title: '۵ راهکار کلیدی برای مدیریت و کنترل آسم',
    description: 'زندگی با آسم می‌تواند چالش‌برانگیز باشد، اما با راهکارهای صحیح می‌توان آن را به خوبی کنترل کرد. این مقاله به شما نکات عملی برای بهبود کیفیت زندگی را آموزش می‌دهد.',
    image: {
      src: 'https://images.unsplash.com/photo-1530497610539-43a9fad32a26?q=80&w=1920&auto=format&fit=crop',
      alt: 'فردی در حال استفاده از اسپری تنفسی آسم'
    },
    date: '2025-10-02',
    authors
  },
  {
    slug: '/blog/long-covid-respiratory-effects',
    title: 'اثرات تنفسی کووید طولانی مدت (Long COVID)',
    description: 'بسیاری از بهبودیافتگان کرونا همچنان با عوارض تنفسی دست و پنجه نرم می‌کنند. در این مطلب، به بررسی علائم و رویکردهای درمانی برای لانگ کووید می‌پردازیم.',
    image: {
      src: 'https://images.unsplash.com/photo-1605372333792-2983b63bb6d6?q=80&w=1920&auto=format&fit=crop',
      alt: 'تصویر مفهومی از ویروس کرونا و ریه'
    },
    date: '2025-09-20',
    authors
  },
  {
    slug: '/blog/quitting-smoking-benefits',
    title: 'ترک سیگار: بهترین هدیه به ریه‌های شما',
    description: 'ترک سیگار فرآیندی است که فواید بی‌شماری برای سلامت ریه‌ها و کل بدن دارد. با مراحل و نکات کلیدی برای موفقیت در این مسیر آشنا شوید.',
    image: {
      src: 'https://images.unsplash.com/photo-1543699566-b3a623a69324?q=80&w=1920&auto=format&fit=crop',
      alt: 'فردی در حال شکستن یک سیگار به نشانه ترک'
    },
    date: '2025-09-05',
    authors
  }
]

// تابعی برای فرمت کردن تاریخ به فرمت دلخواه (مثلاً شمسی)
// در اینجا برای سادگی فقط فرمت استاندارد نمایش داده می‌شود
function formattedDate (dateString: string) {
  return new Date(dateString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
<template>
  <UCarousel
      :items="blogPosts"
      :dir="dir"
      :ui="{
        item: isDesktopOrTablet ? 'basis-1/3' : 'basis-full',
        container: 'gap-4 md:gap-6'
      }"
      arrows
      class="w-full overflow-hidden"
    >
      <!--
        - v-slot="{ item }": به ما اجازه می‌دهد تا به داده‌های هر آیتم در حلقه دسترسی داشته باشیم.
        - :to="item.slug": هر کارت مقاله را قابل کلیک و لینک‌دار می‌کند.
      -->
      <template #default="{ item }">
        <div class="p-1 h-full">
          <UBlogPost
            :to="item.slug"
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :date="formattedDate(item.date)"
            :authors="item.authors"
            orientation="vertical"
            :ui="{
              description: 'line-clamp-3'
            }"
            class="h-full"
          />
        </div>
      </template>

      <!-- اسلات برای سفارشی سازی دکمه‌های قبل و بعد -->
      <template #prev="{ onClick, disabled }">
        <UButton
          :icon="dir === 'rtl' ? 'i-heroicons-arrow-right-20-solid' : 'i-heroicons-arrow-left-20-solid'"
          color="neutral"
          variant="ghost"
          class="absolute top-1/2 -translate-y-1/2"
          :class="dir === 'rtl' ? 'right-0 -mr-2' : 'left-0 -ml-2'"
          :disabled="disabled"
          @click="onClick"
        />
      </template>

      <template #next="{ onClick, disabled }">
        <UButton
          :icon="dir === 'rtl' ? 'i-heroicons-arrow-left-20-solid' : 'i-heroicons-arrow-right-20-solid'"
          color="neutral"
          variant="ghost"
          class="absolute top-1/2 -translate-y-1/2"
          :class="dir === 'rtl' ? 'left-0 -ml-2' : 'right-0 -mr-2'"
          :disabled="disabled"
          @click="onClick"
        />
      </template>
    </UCarousel>
</template>
