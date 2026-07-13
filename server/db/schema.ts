import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  section: text('section', { enum: ['blog', 'medical', 'patient', 'faq'] }).notNull(),
  parentId: integer('parent_id'),
  nameFa: text('name_fa').notNull(),
  nameEn: text('name_en').notNull(),
  slug: text('slug').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  section: text('section', { enum: ['service', 'blog', 'medical', 'patient'] }).notNull(),
  slug: text('slug').notNull().unique(),
  titleFa: text('title_fa').notNull(),
  titleEn: text('title_en').notNull(),
  descriptionFa: text('description_fa').notNull(),
  descriptionEn: text('description_en').notNull(),
  image: text('image'),
  videoUrl: text('video_url'),
  categoryId: integer('category_id'),
  publishedAt: text('published_at').notNull().default(sql`(datetime('now'))`),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
})

export const attachments = sqliteTable('attachments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull(),
  titleFa: text('title_fa').notNull(),
  titleEn: text('title_en').notNull(),
  kind: text('kind', { enum: ['file', 'link'] }).notNull(),
  url: text('url').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export const faqs = sqliteTable('faqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull(),
  questionFa: text('question_fa').notNull(),
  questionEn: text('question_en').notNull(),
  answerFa: text('answer_fa').notNull(),
  answerEn: text('answer_en').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export type User = typeof users.$inferSelect
export type Category = typeof categories.$inferSelect
export type Post = typeof posts.$inferSelect
export type Attachment = typeof attachments.$inferSelect
export type Faq = typeof faqs.$inferSelect

export type PostSection = 'service' | 'blog' | 'medical' | 'patient'
export type CategorySection = 'blog' | 'medical' | 'patient' | 'faq'
