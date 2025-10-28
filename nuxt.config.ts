// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device'
  ],
    app: {
    baseURL: '/dr-sami/',
    buildAssetsDir: 'assets/'
  },
  ssr:true,
  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false, // ✅ غیرفعال (قبلاً اعمال شده)
      concurrency: 1,    // ✅ فقط یک route همزمان
      interval: 100      // ✅ تاخیر بین route‌ها
    },

    // ✨ جدید: غیرفعال کردن ویژگی‌های سنگین
    minify: false,        // 🔴 موقتاً غیرفعال (minify سنگینه)
    sourceMap: false,     // ✅ حذف sourcemap

    // ✨ جدید: کاهش فشرده‌سازی
    compressPublicAssets: false, // 🔴 موقتاً غیرفعال

    // ✨ جدید: تنظیمات rollup سبک‌تر
    rollupConfig: {
      output: {
        chunkFileNames: '_nuxt/[name].js',
        manualChunks: undefined // 🔴 حذف manual chunks
      }
    }
  },


  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'fa',
        iso: 'fa-IR',
        name: 'فارسی',
        file: 'fa.json',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'fa',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
