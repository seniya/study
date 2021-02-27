// import ContainerLayout from '@/views/articles/container.vue'

/*
| `Articles 그룹`          | /articles
| `Articles 목록 페이지`   | /articles/list
| `Articles 읽기 페이지'   | /articles/read
| `Articles 작성 페이지`   | /articles/create
| `Articles 수정 페이지`   | /articles/update
*/

export default {
  path: '/articles',
  component: () => import(/* webpackChunkName: "articlesContainer" */ '@/views/articles/container.vue'),
  redirect: '/articles/list',
  children: [
    {
      name: 'articlesList',
      component: () => import(/* webpackChunkName: "articlesList" */ '@/views/articles/articlesList.vue'),
      path: '/articles/list'
    },
    {
      name: 'articlesCreate',
      component: () => import(/* webpackChunkName: "articlesCreate" */ '@/views/articles/articlesCreate.vue'),
      path: '/articles/create'
    },
    {
      name: 'articlesRead',
      component: () => import(/* webpackChunkName: "articlesRead" */ '@/views/articles/articlesRead.vue'),
      path: '/articles/read/:articleId'
    },
    {
      name: 'articlesUpdate',
      component: () => import(/* webpackChunkName: "articlesUpdate" */ '@/views/articles/articlesUpdate.vue'),
      path: '/articles/update/:articleId'
    }
  ]
}
