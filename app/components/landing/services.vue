<script setup lang="ts">
const services = [
  {
    icon: 'i-ph-lungs-duotone',
    title: 'تشخیص و درمان آسم و آلرژی‌های تنفسی',
    description: 'ارائه جدیدترین روش‌های تشخیصی و درمانی برای کنترل کامل آسم و آلرژی‌ها در کودکان و بزرگسالان، جهت بهبود کیفیت زندگی و تنفس راحت.',
    to: '/services/asthma-allergy' // لینک به صفحه جزئیات خدمت
  },
  {
    icon: 'i-ph-wind-duotone',
    title: 'مدیریت بیماری‌های مزمن انسدادی ریه (COPD)',
    description: 'برنامه‌ریزی درمانی جامع شامل دارودرمانی، بازتوانی ریوی و آموزش‌های لازم برای کاهش علائم و جلوگیری از پیشرفت بیماری.',
    to: '/services/copd'
  },
  {
    icon: 'i-ph-magnifying-glass-plus-duotone',
    title: 'برونکوسکوپی تشخیصی و درمانی',
    description: 'انجام برونکوسکوپی با تجهیزات پیشرفته برای نمونه‌برداری (بیوپسی)، تشخیص دقیق بیماری‌های ریوی و انجام اقدامات درمانی لازم.',
    to: '/services/bronchoscopy'
  },
  {
    icon: 'i-ph-chart-line-up-duotone',
    title: 'تست‌های عملکرد ریوی (اسپیرومتری)',
    description: 'ارزیابی دقیق ظرفیت و عملکرد ریه‌ها از طریق اسپیرومتری برای تشخیص صحیح بیماری‌ها و پایش روند درمان.',
    to: '/services/spirometry'
  },
  {
    icon: 'i-ph-snowflake-duotone',
    title: 'بیماری‌های بینابینی ریه و فیبروز ریوی',
    description: 'رویکرد تخصصی در تشخیص و مدیریت بیماری‌های پیچیده ریوی مانند فیبروز، با هدف کند کردن روند بیماری و حفظ عملکرد تنفسی.',
    to: '/services/ild-fibrosis'
  },
  {
    icon: 'i-ph-moon-duotone',
    title: 'اختلالات تنفسی مرتبط با خواب (آپنه خواب)',
    description: 'بررسی و درمان وقفه تنفسی در خواب (آپنه) برای بهبود کیفیت خواب، کاهش خستگی روزانه و پیشگیری از عوارض قلبی-عروقی.',
    to: '/services/sleep-apnea'
  },
  {
    icon: 'i-ph-crosshair-duotone',
    title: 'تشخیص زودهنگام و غربالگری سرطان ریه',
    description: 'ارائه خدمات غربالگری برای افراد در معرض خطر و تشخیص مراحل اولیه سرطان ریه با بهره‌گیری از متدهای نوین جهت افزایش شانس موفقیت درمان.',
    to: '/services/lung-cancer-screening'
  },
  {
    icon: 'i-ph-users-three-duotone',
    title: 'مشاوره تخصصی ریه (نظر دوم)',
    description: 'ارائه مشاوره قبل از عمل‌های جراحی سنگین، بررسی تخصصی پرونده‌های پزشکی پیچیده (نظر دوم) و راهنمایی بیماران جهت انتخاب بهترین مسیر درمانی.',
    to: '/services/consultation'
  }
]
</script>
<template>
   <UPageGrid>
      <!-- با یک حلقه v-for، تمام خدمات تعریف شده در آرایه services را به صورت کارت نمایش می‌دهیم -->
      <UPageCard
        v-for="(service, index) in services"
        :key="index"
        v-bind="service"
        :ui="{
          title: 'text-xl'
        }"
      >
        <!-- می‌توانیم از اسلات description برای سفارشی‌سازی بیشتر استفاده کنیم -->
        <template #description>
          <span class="line-clamp-3 text-base text-gray-600 dark:text-gray-300">
            {{ service.description }}
          </span>
        </template>
      </UPageCard>
    </UPageGrid>
</template>
