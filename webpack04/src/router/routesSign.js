import ContainerLayout from '@/views/sign/container.vue'

/*
| `인증 그룹`       | /sign
| `로그인 페이지`   | /sign/in
| `로그아웃 페이지` | /sign/out
*/

export default {
  path: '/sign',
  component: ContainerLayout,
  redirect: '/sign/signIn',
  children: [
    {
      name: 'signIn',
      component: () => import(/* webpackChunkName: "signIn" */ '@/views/sign/signIn.vue'),
      path: '/sign/in'
    },
    {
      name: 'signOut',
      component: () => import(/* webpackChunkName: "signOut" */'@/views/sign/signOut.vue'),
      path: '/sign/out'
    }
  ]
}
