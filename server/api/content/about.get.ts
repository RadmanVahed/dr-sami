import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const LOCALES = new Set(['fa', 'en'])

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const locale = String(query.locale || 'fa')

  if (!LOCALES.has(locale)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  }

  const filePath = join(process.cwd(), 'content', locale, 'about.yml')

  let raw: string
  try {
    raw = await readFile(filePath, 'utf8')
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'About page not found' })
  }

  const data = parseYaml(raw) as Record<string, unknown>
  if (!data || typeof data !== 'object') {
    throw createError({ statusCode: 404, statusMessage: 'About page not found' })
  }

  const { seo, title, description, ...meta } = data

  return {
    id: `${locale}/${locale}/about.yml`,
    title: title ?? '',
    description: description ?? '',
    extension: 'yml',
    seo: seo ?? {},
    meta,
    path: `/${locale}/about`,
    stem: `${locale}/about`
  }
})
