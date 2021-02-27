import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/moment'
import '@/plugins/lodash'
import '@/error'

// import '@/assets/css/style.css' <== 실제 프로젝트 진행시 아래 항목 대신 사용(퍼블팀으로부터 전달)
import './plugins/antd' // <== 설명을 위한 디자인 라이브러리 스택

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
