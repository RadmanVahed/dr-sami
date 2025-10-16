// file: content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
// const createBaseSchema = () => z.object({
//   title: z.string(),
//   description: z.string()
// })

// const createButtonSchema = () => z.object({
//   label: z.string(),
//   icon: z.string().optional(),
//   to: z.string().optional(),
//   color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
//   size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
//   variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
//   target: z.enum(['_blank', '_self']).optional()
// })

// const createImageSchema = () => z.object({
//   src: z.string().editor({ input: 'media' }),
//   alt: z.string()
// })

// const createAuthorSchema = () => z.object({
//   name: z.string(),
//   description: z.string().optional(),
//   username: z.string().optional(),
//   twitter: z.string().optional(),
//   to: z.string().optional(),
//   avatar: createImageSchema().optional()
// })

// const createTestimonialSchema = () => z.object({
//   quote: z.string(),
//   author: createAuthorSchema()
// })

// const indexSchema = createBaseSchema().extend({
//   hero: z.object({
//     links: z.array(createButtonSchema()),
//     images: z.array(createImageSchema())
//   }),
//   experience: createBaseSchema().extend({
//     items: z.array(z.object({
//       date: z.date(),
//       position: z.string(),
//       company: z.object({
//         name: z.string(),
//         url: z.string(),
//         logo: z.string().editor({ input: 'icon' }),
//         color: z.string()
//       })
//     }))
//   }),
//   testimonials: createBaseSchema().extend({
//     items: z.array(createTestimonialSchema())
//   }),
//   faq: createBaseSchema().extend({
//     categories: z.array(z.object({
//       title: z.string().nonempty(),
//       questions: z.array(z.object({
//         label: z.string().nonempty(),
//         content: z.string().nonempty()
//       }))
//     }))
//   })
// })

// const aboutSchema = createBaseSchema().extend({
//   images: z.array(createImageSchema())
// })

// const speakingSchema = createBaseSchema().extend({
//   links: z.array(createButtonSchema()),
//   events: z.array(z.object({
//     category: z.enum(['Live talk', 'Podcast', 'Conference']),
//     title: z.string(),
//     date: z.date(),
//     location: z.string(),
//     url: z.string().optional()
//   }))
// })

// const projectsSchema = z.object({
//   title: z.string().nonempty(),
//   description: z.string().nonempty(),
//   image: z.string().nonempty().editor({ input: 'media' }),
//   url: z.string().nonempty(),
//   tags: z.array(z.string()),
//   date: z.date()
// })

// const blogSchema = z.object({
//   title: z.string(),
//   description: z.string(),
//   minRead: z.number(),
//   date: z.date(),
//   image: z.string().nonempty().editor({ input: 'media' }),
//   author: createAuthorSchema()
// })

const commonSchema = z.object({})

export default defineContentConfig({
  // تعریف collections برای هر زبان
  collections: {
    // نام collection برای زبان انگلیسی
    en: defineCollection({
      name: 'en', // نامی که در کوئری‌ها استفاده می‌شود
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '/en', // پیشوند منبع فایل‌ها
      },
      schema: commonSchema,
    }),
    // نام collection برای زبان فارسی
    fa: defineCollection({
      name: 'fa',
      type: 'page',
      source: {
        include: 'fa/**',
        prefix: '/fa',
      },
      schema: commonSchema,
    }),
  },
})
