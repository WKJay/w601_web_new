const proxy = require('http-proxy-middleware');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// vue.config.js

module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  devServer: {
    proxy: 'http://192.168.2.10/'
  },
  configureWebpack: {
    plugins: [
        new CompressionWebpackPlugin({
            // 正在匹配需要压缩的文件后缀
            test: /\.(js|css|svg|woff|ttf|json|html)$/,
            // 大于10kb的会压缩
            threshold: 2048,
          })
    ]
},
}