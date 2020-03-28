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
  loading: { color: 'red' },
  /*
   ** Global CSS
   */
  css: ['~/assets/transition.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/global-components',
    '~/plugins/firebase',
    '~/plugins/mask'
  ],
  /*

   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  vuetify: {
    font: {
      family: 'Roboto'
    },
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      dark: true
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-clipboard2',
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vuetify-dialog/nuxt',
    'nuxt-lazy-load'
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
