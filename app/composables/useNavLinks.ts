import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks(): NavigationMenuItem[] {
  const { t, locales } = useI18n()
  const localePath = useLocalePath()

  return [
    { label: t('basic.home'), to: localePath('/') },
    {
      label: t('basic.services')
    },
    {
      label: t('navigation.medicalEducation'),
    },
      {
        label: t('navigation.patientEducation'),
      }, { label: t('navigation.aboutDoctor')}
  ]
}
