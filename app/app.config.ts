export default defineAppConfig({
  global: {
    picture: {
      image: '',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-instagram',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': 'Dr Sami on Instagram'
  },{
      'icon': 'i-simple-icons-whatsapp',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': 'Dr Sami on Whatsapp'
  }]
  }
})
