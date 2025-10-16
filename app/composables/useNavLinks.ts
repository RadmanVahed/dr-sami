import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks(): NavigationMenuItem[] {
  const { t, locales } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const localeChildren: NavigationMenuItem['children'] = (locales.value || []).map(l => ({
    label: l.name,
    to: switchLocalePath(l.code)
  }))

  return [
    { label: t('navigation.home'), icon: 'i-lucide-home', to: localePath('/') },
    { trailingIcon:'i-lucide-text-align-justify', popover: {
        mode: 'click'
      }, children: [
      {
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: 'i-lucide-house'
      },
      {
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: 'i-lucide-cloud-download'
      },
      {
        label: 'Icons',
        icon: 'i-lucide-smile',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
      },
      {
        label: 'Colors',
        icon: 'i-lucide-swatch-book',
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
      },
      {
        label: 'Theme',
        icon: 'i-lucide-cog',
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      }
    ]},
    { label: t('navigation.appointment'), icon: 'i-lucide-file-text', to: localePath('/speaking') },
    { label: t('navigation.educational'), icon: 'i-lucide-mic', to: localePath('/speaking') },
    { label: t('navigation.profile'), icon: 'i-lucide-user', to: localePath('/about') }
  ]
}
