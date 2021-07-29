import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - dev',
    title: 'Digital Jam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css', '@/assets/css/transitions.css', 'animate.css/animate.min.css'
  ],
  pageTransition: 'fade',
  layoutTransition: 'fade',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-plyr', mode: 'client' },
    { src: '~/plugins/vue-gapi', mode: 'client' },
    // '~/plugins/api-client.js',

  ],
  //added section to test nodemailer through middleware as suggested here:
  //https://blog.lichter.io/posts/emails-through-nuxtjs/
  serverMiddleware: [
    { path: '/api', handler: '~/api/server.js' },
    // { path: '/contact', handler: '~/api/contact.js' },
    // '~/api/contact',
    // '~/api/auth',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // nuxt auth library
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000/api/',
    credentials: true
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ['author.name']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ['vue-google-api']
  },
  ssr: true,
  //auth config
  auth: {
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        }
      }
    }
  },
  // router: {
  //   middleware: ['auth']
  // }
}