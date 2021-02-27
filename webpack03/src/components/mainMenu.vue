<template>
  <div>

    <!-- 디자인 없이..
    <div id="nav">
      <router-link to="/">홈</router-link> |
      <router-link to="/sign/in">
        로그인
        <span v-if="$store.state.auth.user.token && $store.state.auth.user.token !== undefined" style="color: red;">(로그인됨)</span>
      </router-link> |
      <router-link to="/posts">게시판 with Vuex Full</router-link> |
      <router-link to="/articles">게시판 with Vuex Some</router-link> |
      <router-link to="/letters">게시판 without Vuex</router-link> |
      <router-link to="/pages/1">페이지1 - 권한없이 접근</router-link> |
      <router-link to="/pages/2">페이지2 - 권한확인 with page</router-link> |
      <router-link to="/pages/3">페이지3 - 권한확인 with router</router-link>
    </div>
    -->

    <!-- antd 반영 -->
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="home">
        <router-link to="/">홈</router-link>
      </a-menu-item>
      <a-menu-item key="sign">
        <router-link to="/sign/in">
        로그인
        <span v-if="$store.state.auth.user.token && $store.state.auth.user.token !== undefined" style="color: red;">(로그인됨)</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="posts">
        <router-link to="/posts">게시판 with Vuex Full</router-link>
      </a-menu-item>
      <a-menu-item key="articles">
        <router-link to="/articles">게시판 with Vuex Some</router-link>
      </a-menu-item>
      <a-menu-item key="letters">
        <router-link to="/letters">게시판 without Vuex</router-link>
      </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">페이지 모음</span>
        <a-menu-item-group>
          <a-menu-item key="page:1">
            <router-link to="/pages/1">페이지1 - 권한없이 접근</router-link>
          </a-menu-item>
          <a-menu-item key="page:2">
           <router-link to="/pages/2">페이지2 - 권한확인 with page</router-link>
          </a-menu-item>
          <a-menu-item key="page:3">
           <router-link to="/pages/3">페이지3 - 권한확인 with router</router-link>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>

  </div>
</template>

<script>
export default {
  name: 'mainMenu',
  data () {
    return {
      current: ['home'],
      routePath: this.$route.path
    }
  },

  watch: {
    '$route.path': {
      handler: function (path) {
        this.cbSetCurrent(path)
      },
      deep: true,
      immediate: true
    }
  },

  created () {
    this.cbSetCurrent(this.$route.path)
  },

  methods: {
    cbSetCurrent (path) {
      if (path === '/') {
        this.current = ['home']
      } else if (path === '/sign/in') {
        this.current = ['sign']
      } else if (path.indexOf('posts') > -1) {
        this.current = ['posts']
      } else if (path.indexOf('articles') > -1) {
        this.current = ['articles']
      } else if (path.indexOf('letters') > -1) {
        this.current = ['letters']
      } else if (path.indexOf('pages') > -1) {
        this.current = ['pages']
      }
    }
  }
}
</script>

<style>
</style>
