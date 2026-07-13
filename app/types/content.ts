export type PostSection = 'service' | 'blog' | 'medical' | 'patient'
export type CategorySection = 'blog' | 'medical' | 'patient' | 'faq'

export interface Attachment {
  id?: number
  postId?: number
  titleFa: string
  titleEn: string
  kind: 'file' | 'link'
  url: string
}

export interface Post {
  id: number
  section: PostSection
  slug: string
  titleFa: string
  titleEn: string
  descriptionFa: string
  descriptionEn: string
  image: string | null
  videoUrl: string | null
  categoryId: number | null
  publishedAt: string
  createdAt?: string
  updatedAt?: string
  attachments?: Attachment[]
}

export interface Category {
  id: number
  section: CategorySection
  parentId: number | null
  nameFa: string
  nameEn: string
  slug: string
  sortOrder: number
}

export interface Faq {
  id: number
  categoryId: number
  questionFa: string
  questionEn: string
  answerFa: string
  answerEn: string
  sortOrder: number
}

export interface FaqCategory extends Category {
  questions?: Faq[]
}

export interface PostInput {
  section: PostSection
  slug: string
  titleFa: string
  titleEn: string
  descriptionFa: string
  descriptionEn: string
  image?: string | null
  videoUrl?: string | null
  categoryId?: number | null
  publishedAt?: string
  attachments?: Attachment[]
}

export interface CategoryInput {
  section: CategorySection
  parentId?: number | null
  nameFa: string
  nameEn: string
  slug: string
  sortOrder?: number
}

export interface FaqInput {
  categoryId: number
  questionFa: string
  questionEn: string
  answerFa: string
  answerEn: string
  sortOrder?: number
}

export interface DashboardStats {
  services: number
  blogs: number
  medical: number
  patient: number
  faqs: number
  categories: number
}
