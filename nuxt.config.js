export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // trailingSlash: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Enab',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/font.css',
    '@/assets/css/quick-website.css',
    '@/assets/css/responsive.css',
    '@/assets/scss/app.scss',
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/custom-functions.js', mode: 'client'},
    {src: '~/plugins/vuejs-dialog', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Auth
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // style resource
    '@nuxtjs/style-resources',

    'nuxt-i18n'
  ],

  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    vueI18n: {
      fallbackLocale: 'ar',
      numberFormats: {
        ar: {
          currency: {
            style: 'currency', 
            currency: 'iqd'
          }
        }
      }
    },
  },


  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
        // url: 'https://pos.itourstory.com',
        endpoints: {
          login: { 
              url: '/api/login',
          },
        },
      },
    }
  },

  router: {
    middleware: ['auth'],
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    withCredentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: "عنب",
      author: 'Ourstory'
    },
    manifest: {
      name: 'Enab',
      short_name: 'Enab',
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    hotMiddleware: {
      client: {
        overlay: false
      }
    }
  },

  // styleResource
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ]
  },

}
