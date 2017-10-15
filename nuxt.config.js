
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '랩바이랩',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#29B6F6'},
      { hid: 'description', name: 'description', content: 'labbylab' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css' },
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vue.smooth.scroll.js',
    {src: '~/plugins/vue.prototype.js', ssr: false}],
  css: [
    '~/assets/style/app.styl'
  ],
  loading: '~/components/loading.vue',
  build: {
    vendor: [
      'babel-polyfill',
      '~/plugins/vuetify.js',
      'axios',
      'jwt-decode',
      'js-cookie',
      '~/plugins/vue.smooth.scroll.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
