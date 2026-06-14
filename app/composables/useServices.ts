export interface ServiceItem {
  key: string
  slug: string
  to: string
  image: string
}

export const services: ServiceItem[] = [
  { key: 'asthmaAllergy', slug: 'asthma-allergy', to: '/service/asthma-allergy', image: '/images/services/asthma-allergy.png' },
  { key: 'copd', slug: 'copd', to: '/service/copd', image: '/images/services/copd.png' },
  { key: 'bronchoscopy', slug: 'bronchoscopy', to: '/service/bronchoscopy', image: '/images/services/bronchoscopy.png' },
  { key: 'spirometry', slug: 'spirometry', to: '/service/spirometry', image: '/images/services/spirometry.png' },
  { key: 'ildFibrosis', slug: 'ild-fibrosis', to: '/service/ild-fibrosis', image: '/images/services/ild-fibrosis.png' },
  { key: 'sleepApnea', slug: 'sleep-apnea', to: '/service/sleep-apnea', image: '/images/services/sleep-apnea.png' },
  { key: 'cancerScreening', slug: 'lung-cancer-screening', to: '/service/lung-cancer-screening', image: '/images/services/lung-cancer-screening.png' },
  { key: 'consultation', slug: 'consultation', to: '/service/consultation', image: '/images/services/consultation.png' }
]

export function useServices() {
  function findBySlug(slug: string) {
    return services.find(service => service.slug === slug)
  }

  return { services, findBySlug }
}
