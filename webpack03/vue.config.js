// const chunkPrefix = '[name].chunk-vendors'
// const CompressionPlugin = require('compression-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  // plugins: [new CompressionPlugin()],
  // configureWebpack: {
  //   plugins: [
  //     new CompressionPlugin()
  //   ]
  // },
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css'
    }
  },
  // css: {
  //   loaderOptions: {
  //     css: {
  //       // Note: the following config format is different between Vue CLI v4 and v3
  //       // For Vue CLI v3 users, please refer to css-loader v1 documentations
  //       // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
  //       modules: {
  //         localIdentName: '[name]'
  //       },
  //       localsConvention: 'camelCaseOnly'
  //     }
  //   }
  // },
  chainWebpack: (config) => {
    // config.module
    //   .rule('css')
    //   .oneOf('vue-modules')
    //   .use('css-loader')
    //   .tap(options => {
    //     options.modules.localIdentName = '[name]'
    //     return options
    //   })
    config.plugins.delete('prefetch')
    // config.plugin('CompressionPlugin').use(new CompressionWebpackPlugin())
    // config.plugin('CompressionPlugin').use(CompressionPlugin)
  },
  configureWebpack: config => {
    config.output.filename = 'js/[name].js'
    config.output.chunkFilename = 'js/[name].js'

    // if (process.env.NODE_ENV === 'production') {
    //   return {
    //     plugins: [
    //       new CompressionPlugin({
    //         test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
    //         threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
    //         deleteOriginalAssets: false // 是否删除原文件
    //       })
    //     ]
    //   }
    // }

    /*
    if (process.env.NODE_ENV === 'production') {
      // return {
      //   plugins: [
      //     new CompressionPlugin({
      //       test: /\.js$|\.css$|\.html$/
      //     })
      //   ]
      // }

      const plugins = []
      // start 生成 gzip 压缩文件
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }
    */

    // config.plugins.delete('prefetch-index').delete('preload-index');

    // config.plugins('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })

    // config.plugins.store.delete("prefetch");
    // config.plugins.store.delete("preload");
    // config.plugins.delete('prefetch');
    // config.plugins.delete('prefetch')
    // output: {
    //   filename: "[name]-bundle.js",
    //   path: path.resolve(__dirname, "../dist")
    // }
    // console.log('configureWebpack config : ', config.plugin('prefetch'))
  }
}
