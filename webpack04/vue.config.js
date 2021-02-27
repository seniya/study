module.exports = {
  configureWebpack: config => {    
    config.output.filename = 'js/[name].js'
    config.output.chunkFilename = 'js/[name].js'
    config.plugins.delete ('prefetch')
    // output: {
    //   filename: "[name]-bundle.js",
    //   path: path.resolve(__dirname, "../dist")
    // }
    console.log('configureWebpack config : ', config)
  }
}