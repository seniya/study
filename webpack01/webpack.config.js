const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'), //경로
  },
  module: {
  //자바스크립트 파일들을 어떻게 처리할건지 정해둔다
    rules: [
      {
        test: /\.vue$/, //파일명이 .vue로 끝나는 파일
        loader: 'vue-loader', //vue-loader을 사용하겠다. use: 'vue-loader'도 가능
      },
      // 파일명이 .css로 끝나는 파일들은 해당 loader을 사용
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};