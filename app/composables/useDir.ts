// composables/useDir.ts
import { useI18n } from 'vue-i18n'

export function useDir() {
  const { locale, locales } = useI18n()

  const dir = computed(() => {
    const lang = locales.value.find(l => l.code === locale.value)
    return lang?.dir || 'ltr'
  })

  return dir
}
