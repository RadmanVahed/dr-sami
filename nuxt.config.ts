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
ssr: true,

  devtools: { enabled: true },

  // SEO: App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'fa',
      },
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // { rel: 'manifest', href: '/site.webmanifest' },
        // { rel: 'dns-prefetch', href: 'https://aradcore.com' },
        // { rel: 'preconnect', href: 'https://aradcore.com', crossorigin: 'anonymous' },
        // {
        //   rel: 'preload',
        //   as: 'font',
        //   type: 'font/woff2',
        //   href: '/fonts/iranyekan/woff2/IRANYekanWebRegular.woff2',
        //   crossorigin: 'anonymous'
        // },
        // {
        //   rel: 'preload',
        //   as: 'font',
        //   type: 'font/woff2',
        //   href: '/fonts/iranyekan/woff2/IRANYekanWebBold.woff2',
        //   crossorigin: 'anonymous'
        // }
      ]
    },
    pageTransition: false,
    layoutTransition: false
  },

  css: ['~/assets/css/main.css'],

  // SEO: Site Configuration
  // site: {
  //   url: 'https://aradcore.com',
  //   name: 'AradCore',
  //   description: 'طراحی و توسعه وب‌سایت، نرم‌افزار و ارائه سرویس‌های SaaS حرفه‌ای',
  //   identity: {
  //     type: 'Organization'
  //   }
  // },

  runtimeConfig: {
    public: {
      siteUrl: 'https://raminsami.ir'
    }
  },

  // ✅ فقط یک جا routeRules (در root)
  routeRules: {
    '/': {
      prerender: true,
      swr: 3600 // 1 hour
    },
    '/images/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  },

  future: {
    compatibilityVersion: 4
  },

  experimental: {
    componentIslands: true,
    payloadExtraction: true,
    asyncContext: true,
    viewTransition: false, // ✅ غیرفعال
    headNext: true
  },

  compatibilityDate: '2024-04-03',

  // ✅ Nitro بدون routeRules
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/api'],
      failOnError: false
    }
  },

  // ✅ Vite فیکس شده
  vite: {
    build: {
      cssMinify: 'lightningcss',
      target: 'es2020',
      minify: 'terser',

      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info']
        },
        // ✅ فیکس: output نه format
        output: {
          comments: false
        }
      },


    },

    // ✅ فیکس SSR externals
    ssr: {
      noExternal: ['@nuxt/ui', '@headlessui/vue']
    },

    server: {
      preTransformRequests: false
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  // image: {
  //   provider: 'ipx',
  //   quality: 85,
  //   format: ['webp', 'avif'],
  //   screens: {
  //     xs: 320,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536
  //   },
  //   presets: {
  //     hero: {
  //       modifiers: {
  //         format: 'webp',
  //         quality: 90,
  //         width: 1920,
  //         height: 1080
  //       }
  //     }
  //   }
  // },

  // robots: {
  //   allow: '/',
  //   sitemap: 'https://aradcore.com/sitemap.xml'
  // },

  // schemaOrg: {
  //   identity: {
  //     type: 'Organization',
  //     name: 'AradCore',
  //     url: 'https://aradcore.com',
  //     logo: 'https://aradcore.com/logo.png'
  //   }
  // },

  // sitemap: {
  //   exclude: ['/admin/**', '/api/**'],
  //   xsl: false,
  //   credits: false
  // },

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
