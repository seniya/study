<template>
  <div>
    <div>
      <h3>
        Articles 상세 페이지
        <button @click="onClcikRefreshBtn">새로고침</button>
      </h3>
    </div>

    <!-- 디자인 없이..
    <p>isLoadingArticleRead: {{isLoadingArticleRead}}</p>
    <p>doneArticleRead: {{doneArticleRead}}</p>
    <p>errorArticleRead: {{errorArticleRead}}</p>

    <div style="width: 100%; padding: 10px; border: 1px #cccccc solid;">
      <p>id : {{item.id}}</p>
      <p>title : {{item.title}}</p>
      <p>content : {{item.content}}</p>
      <p>image : {{item.image}}</p>
      <p>animals : {{item.animals}}</p>
      <div>
        <button @click="onClickBackBtn">back</button>
        <button @click="onClickEditBtn(item.id)">edit</button>
        <button @click="onClickDeleteBtn(item.id)">delete</button>
      </div>
    </div>
    -->

    <!-- antd 반영 -->
    <viewRead
      :item="item"
      :isLoadingArticleRead="isLoadingArticleRead"
      :doneArticleRead="doneArticleRead"
      :isLoadingArticleRemove="isLoadingArticleRemove"
      :onClickBackBtn_="onClickBackBtn"
      :onClickEditBtn_="onClickEditBtn"
      :onClickDeleteBtn_="onClickDeleteBtn" />

    <div>
      <displayTime
        :time="item.createAt"
        type="full"/>
    </div>
  </div>
</template>

<script>
import displayTime from '@/components/displayTime'
import viewRead from '@/views/articles/components/viewRead'

export default {
  name: 'articlesRead',

  components: {
    displayTime,
    viewRead
  },

  data () {
    return {
      articleId: this.$route.params.articleId,
      item: {
        id: '',
        title: '',
        content: '',
        image: '',
        author: '',
        createAt: 0
      },
      isLoadingArticleRead: false,
      doneArticleRead: false,
      errorArticleRead: null,

      isLoadingArticleRemove: false,
      doneArticleRemove: false,
      errorArticleRemove: null
    }
  },

  created () {
    console.log('viewRead : ', viewRead)
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      if (this.item.id !== this.articleId) {
        this.requestAPI()
      }
    },
    async requestAPI () {
      this.isLoadingArticleRead = true
      this.doneArticleRead = false
      try {
        const responseData = await this.$store.dispatch('article/ARTICLE_READ', { id: this.articleId })
        this.item = responseData
        this.isLoadingArticleRead = false
        this.doneArticleRead = true
      } catch (error) {
        this.isLoadingArticleRead = false
        this.errorArticleRead = error.message
      }
    },
    onClcikRefreshBtn () {
      this.$store.commit('article/reSetItem')
      this.requestAPI()
    },
    onClickBackBtn () {
      this.$router.push('/articles/list')
    },
    onClickEditBtn (articleId) {
      this.$router.push(`/articles/update/${articleId}`)
    },
    async onClickDeleteBtn (articleId) {
      this.isLoadingArticleRemove = true
      this.doneArticleRemove = false
      try {
        await this.$store.dispatch('article/ARTICLE_REMOVE', { id: this.articleId })
        this.isLoadingArticleRemove = false
        this.doneArticleRemove = true
        this.$router.push('/articles/list')
      } catch (error) {
        this.isLoadingArticleRemove = false
        this.errorArticleRemove = error.message
      }
    }
  }

}
</script>

<style>

</style>
