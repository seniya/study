<template>
  <div>
    <div>
      <h3>
        Articles 목록 페이지
        <button @click="onClcikRefreshBtn">새로고침</button>
        &nbsp;&nbsp;
        <button @click="onClcikCreateBtn">새글작성</button>
      </h3>
    </div>

    <!-- 디자인 없이..
    <div>
      isLoadingArticleItems : {{isLoadingArticleItems}}
    </div>
    <div>
      doneArticleItems : {{doneArticleItems}}
    </div>
    <div>
      errorArticleItems : {{errorArticleItems}}
    </div>
    <div v-for="(item, index) in items" :key="item.id + index">
      <span>
        <router-link :to="{ name: 'articlesRead', params: { articleId: item.id }}">title : {{ item.title }}</router-link>
      </span>
      <displayTime :tiem="item.createAt" type="normal"/>
    </div>
    <div>
      <button @click="onClickMoreBtn">더보기</button>
    </div>
    -->

    <!-- antd 반영 -->
    <viewList
      :items="items"
      :isLoadingArticleItems="isLoadingArticleItems"
      :doneArticleItems="doneArticleItems"
      :onClickMoreBtn_="onClickMoreBtn"
      :onClickEditBtn_="onClickEditBtn"
      :onClickReadBtn_="onClickReadBtn" />

  </div>
</template>

<script>
import viewList from '@/views/articles/components/viewList'

export default {
  name: 'articlesList',
  components: {
    viewList
  },
  data () {
    return {
      items: [],
      isLoadingArticleItems: false,
      doneArticleItems: false
    }
  },

  created () {
    console.log('viewList : ', viewList)
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      this.requestAPI()
    },
    async requestAPI () {
      this.isLoadingArticleItems = true
      this.doneArticleItems = false
      try {
        const responseData = await this.$store.dispatch('article/ARTICLE_ITEMS', { })
        const newItems = [...this.items, ...responseData]
        this.items = newItems
        this.isLoadingArticleItems = false
        this.doneArticleItems = true
      } catch (error) {
        this.isLoadingArticleItems = false
        this.errorArticleItems = error.message
      }
    },
    async onClickMoreBtn () {
      this.requestAPI()
    },
    onClcikRefreshBtn () {
      this.$store.commit('article/reSetItems')
      this.requestAPI()
    },
    onClickEditBtn (articleId) {
      this.$router.push(`/articles/update/${articleId}`)
    },
    onClickReadBtn (articleId) {
      this.$router.push(`/articles/read/${articleId}`)
    },
    onClcikCreateBtn () {
      console.log('onClcikCreateBtn /articles/create')
      this.$router.push('/articles/create')
    }
  }

}
</script>

<style>
</style>
