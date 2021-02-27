import ContainerLayout from '@/views/pages/container.vue'
import store from '@/store/index'

/*
| `페이지 그룹`     | /page
| `페이지 1`        | /page/1
| `페이지 2`        | /page/2
| `페이지 3`        | /page/3
*/

export default {
  path: '/pages',
  component: ContainerLayout,
  redirect: '/pages/1',
  children: [
    {
      name: 'page1',
      component: () => import(/* webpackChunkName: "page1" */ '@/views/pages/page1.vue'),
      path: '/pages/1'
    },
    {
      name: 'page2',
      component: () => import(/* webpackChunkName: "page2" */ '@/views/pages/page2.vue'),
      path: '/pages/2'
    },
    {
      name: 'page3',
      component: () => import(/* webpackChunkName: "page3" */ '@/views/pages/page3.vue'),
      path: '/pages/3',
      beforeEnter: (to, from, next) => {
        const token = store.getters['auth/getUser'].token
        if (token && token !== undefined) {
          next()
        } else {
          alert('로그인 먼저 하세요')
        }
      }
    }
  ]
}
