import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks(): NavigationMenuItem[] {
  const d = useDevice()
  const { t, locales } = useI18n()
  const localePath = useLocalePath()
  const desktopLinks: NavigationMenuItem[] = []
  if (d.isDesktopOrTablet) {
    desktopLinks.push({
      label: t('navigation.medicalEducation'),
    },
      {
        label: t('navigation.patientEducation'),
      }, { label: t('basic.profile'), icon: 'i-lucide-user' })
  }

  return [
    { label: t('basic.home'), to: localePath('/') },
    {
      label: t('basic.services'), popover: {
        mode: 'click'
      }, children: [
        {
          label: 'اموزش پزشکی', to: localePath('about'), icon: 'i-lucide-external-link'
        },
        {
          label: 'اموزش بیماران', to: localePath('about'), icon: 'i-lucide-external-link'
        },
        {
          label: 'درباره دکتر', to: localePath('about'), icon: 'i-lucide-external-link'
        },
        {
          label: 'ارتباط با دکتر', to: localePath('about'), icon: 'i-lucide-external-link'
        }
      ]
    },
    ...desktopLinks
  ]
}
