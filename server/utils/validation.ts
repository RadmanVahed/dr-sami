import { z } from 'zod'

export const APARAT_EMBED_REGEX = /^https:\/\/www\.aparat\.com\/video\/video\/embed\/videohash\/[a-zA-Z0-9]+\/vt\/frame$/

export const aparatVideoUrlSchema = z.string().regex(APARAT_EMBED_REGEX, {
  message: 'Invalid Aparat embed URL. Use format: https://www.aparat.com/video/video/embed/videohash/{hash}/vt/frame'
})

export const postSectionSchema = z.enum(['service', 'blog', 'medical', 'patient'])
export const categorySectionSchema = z.enum(['blog', 'medical', 'patient', 'faq'])

export const postInputSchema = z.object({
  section: postSectionSchema,
  slug: z.string().min(1),
  titleFa: z.string().min(1),
  titleEn: z.string().min(1),
  descriptionFa: z.string().min(1),
  descriptionEn: z.string().min(1),
  image: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable().refine(
    val => !val || APARAT_EMBED_REGEX.test(val),
    { message: 'Invalid Aparat embed URL' }
  ),
  categoryId: z.number().int().positive().optional().nullable(),
  publishedAt: z.string().optional(),
  attachments: z.array(z.object({
    id: z.number().optional(),
    titleFa: z.string().min(1),
    titleEn: z.string().min(1),
    kind: z.enum(['file', 'link']),
    url: z.string().min(1)
  })).optional()
})

export const categoryInputSchema = z.object({
  section: categorySectionSchema,
  parentId: z.number().int().positive().optional().nullable(),
  nameFa: z.string().min(1),
  nameEn: z.string().min(1),
  slug: z.string().min(1),
  sortOrder: z.number().int().optional()
})

export const faqInputSchema = z.object({
  categoryId: z.number().int().positive(),
  questionFa: z.string().min(1),
  questionEn: z.string().min(1),
  answerFa: z.string().min(1),
  answerEn: z.string().min(1),
  sortOrder: z.number().int().optional()
})

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(4)
})

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0600-\u06FF-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function extractAparatHash(url: string): string | null {
  const match = url.match(/videohash\/([a-zA-Z0-9]+)\/vt\/frame/)
  return match ? match[1] : null
}

export function buildAparatEmbedUrl(hash: string): string {
  return `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame`
}
