const { defineConfig } = require('@vue/cli-service')
const { proxyRefs } = require('vue')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./'
})
