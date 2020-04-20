const proxy = require('http-proxy-middleware');

// vue.config.js

module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  devServer: {
    proxy: 'http://192.168.31.10/'
  }
}