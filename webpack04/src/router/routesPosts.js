import ContainerLayout from '@/views/posts/container.vue'

/*
| `Posts 그룹`          | /posts
| `Posts 목록 페이지`   | /posts/list
| `Posts 읽기 페이지'   | /posts/read
| `Posts 작성 페이지`   | /posts/create
| `Posts 수정 페이지`   | /posts/update
*/

export default {
  path: '/posts',
  component: ContainerLayout,
  redirect: '/posts/list',
  children: [
    {
      name: 'postsList',
      component: () => import(/* webpackChunkName: "postsList" */'@/views/posts/postsList.vue'),
      path: '/posts/list'
    },
    {
      name: 'postsCreate',
      component: () => import(/* webpackChunkName: "postsCreate" */'@/views/posts/postsCreate.vue'),
      path: '/posts/create'
    },
    {
      name: 'postsRead',
      component: () => import(/* webpackChunkName: "postsRead" */'@/views/posts/postsRead.vue'),
      path: '/posts/read/:postId'
    },
    {
      name: 'postsUpdate',
      component: () => import(/* webpackChunkName: "postsUpdate" */'@/views/posts/postsUpdate.vue'),
      path: '/posts/update/:postId'
    }
  ]
}
