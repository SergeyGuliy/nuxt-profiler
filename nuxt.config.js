import colors from 'vuetify/lib/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Profiler',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/transition.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/firebase',
    '~/plugins/global-components',
    '~/plugins/mask'
  ],
  /*

   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    font: {
      family: 'Roboto'
    },
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      dark: false
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vuetify-dialog/nuxt'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
