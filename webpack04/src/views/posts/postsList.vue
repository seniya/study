<template>
  <div>
    <div>
      <h3>
        POSTS 목록 페이지
        <button @click="onClcikRefreshBtn">새로고침</button>
        &nbsp;&nbsp;
        <button @click="onClcikCreateBtn">새글작성</button>
      </h3>
    </div>

    <!-- 디자인 없이..
    <div>
      $store.state.post.isLoadingPostItems : {{$store.state.post.isLoadingPostItems}}
    </div>
    <div>
      $store.state.post.donePostItems : {{$store.state.post.donePostItems}}
    </div>
    <div>
      $store.state.post.errorPostItems : {{$store.state.post.errorPostItems}}
    </div>
    <div v-for="(item, index) in $store.state.post.items" :key="item.id + index">
      <span>
        <router-link :to="{ name: 'postsRead', params: { postId: item.id }}">title : {{ item.title }}</router-link>
      </span>
      <displayTime :tiem="item.createAt" type="normal"/>
    </div>
    <div>
      <button @click="onClickMoreBtn">더보기</button>
    </div>
    -->

    <!-- antd 반영 -->
    <viewList
      :items="$store.state.post.items"
      :isLoadingPostItems="$store.state.post.isLoadingPostItems"
      :donePostItems="$store.state.post.donePostItems"
      :onClickMoreBtn_="onClickMoreBtn"
      :onClickEditBtn_="onClickEditBtn"
      :onClickReadBtn_="onClickReadBtn" />

  </div>
</template>

<script>
import viewList from '@/views/posts/components/viewList'

export default {
  name: 'postsList',
  components: {
    viewList
  },

  created () {
    console.log('viewList : ', viewList)
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      if (this.$store.state.post.items.length === 0) {
        this.requestAPI()
      }
    },
    async requestAPI () {
      const returnCondition = await this.$store.dispatch('post/POST_ITEMS', { })
      console.log('requestAPI returnCondition: ', returnCondition)
    },
    async onClickMoreBtn () {
      this.requestAPI()
    },
    onClcikRefreshBtn () {
      this.$store.commit('post/reSetItems')
      this.requestAPI()
    },
    onClickEditBtn (postId) {
      this.$router.push(`/posts/update/${postId}`)
    },
    onClickReadBtn (postId) {
      this.$router.push(`/posts/read/${postId}`)
    },
    onClcikCreateBtn () {
      this.$router.push('/posts/create')
    }
  }

}
</script>

<style>
</style>
