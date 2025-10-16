// file: composables/useLocalizedContent.ts
import type { Collections } from '@nuxt/content'
import { useI18n } from 'vue-i18n'

export function useLocalizedContent() {
  const { locale } = useI18n()

  /**
   * Query یک صفحه خاص با زبان فعلی
   */
  async function queryLocalizedPage<T extends keyof Collections>(
    collection: T,
    slug?: string
  ) {
    const path = slug
      ? `/${locale.value}/${collection}/${slug}`
      : `/${locale.value}/${collection}`

    return await queryCollection(collection).path(path).first()
  }

  /**
   * Query لیستی از محتوا با زبان فعلی
   */
  async function queryLocalizedList<T extends keyof Collections>(
    collection: T
  ) {
    return await queryCollection(collection)
      .where('_path', 'LIKE', `/${locale.value}/${collection}%`)  // ✅ برای لیست از LIKE استفاده کنید
      .all()
  }

  /**
   * Query با فیلتر دلخواه
   */
  async function queryLocalizedContent<T extends keyof Collections>(
    collection: T,
    filters?: Record<string, any>
  ) {
    let query = queryCollection(collection)
      .where('_path', 'LIKE', `/${locale.value}/${collection}%`)

    // اضافه کردن فیلترهای اضافی
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.where(key, '=', value)
      })
    }

    return await query.all()
  }

  return {
    queryLocalizedPage,
    queryLocalizedList,
    queryLocalizedContent,
    locale
  }
}

