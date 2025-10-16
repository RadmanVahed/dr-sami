// composables/useFont.ts
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

export function useFont() {
  const { locale } = useI18n()

  watchEffect(() => {
    if (document?.documentElement) {
      const htmlEl = document.documentElement
    if (locale.value === 'fa') {
      htmlEl.style.fontFamily = `"IranYekan", system-ui, sans-serif`
    } else {
      htmlEl.style.fontFamily = `"Inter", system-ui, sans-serif`
    }
    }
  })
}
