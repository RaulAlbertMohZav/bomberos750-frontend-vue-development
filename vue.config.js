module.exports = {
  // https://cli.vuejs.org/config/#productionsourcemap
  productionSourceMap: false,
  /* devServer: {
    host: 'academia-bomberos750.test',
    port: 8080,
    https: false
  }, */

  // https://cli.vuejs.org/config/#css-extract
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      sass: {
        additionalData: '@import \'~@/assets/scss/vuetify/variables\''
      },
      scss: {
        additionalData: '@import \'~@/assets/scss/vuetify/variables\';'
      }
    }
  },

  chainWebpack: (config) => {
    // Remove the following lines to add Vue Prefetch and Preload on index.html
    // https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'vuetify'
  ]
}
