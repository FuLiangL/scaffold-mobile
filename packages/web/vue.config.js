const path = require('path')
const setupMockServer = require('dev-utils/mock-server')

function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/common/style/variables/*.less'), // 需要全局导入的变量
        path.resolve(__dirname, './src/common/style/mixins/*.less'), // 需要全局引入的混入
      ],
    })
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: (config) => {
    const types = [ 'vue-modules', 'vue', 'normal-modules', 'normal' ]
    types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  devServer: {
    progress: false,
    setup (app) {
      setupMockServer(app)
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
      postcss: {
        config: {
          path: path.resolve(__dirname),
        },
      },
    },
  },
}
