<template>
  <div>
    <h3>
      Articles 수정 페이지
      <button @click="onClickBackBtn">목록으로</button>
    </h3>

    <!-- 디자인 없이..
    <div>
      <div>
        isLoadingArticleRead : {{isLoadingArticleRead}}
      </div>
      <div>
        isLoadingArticleUpdate : {{isLoadingArticleUpdate}}
      </div>
      <div>
        doneArticleUpdate : {{doneArticleUpdate}}
      </div>
      <div>
        errorArticleUpdate : {{errorArticleUpdate}}
      </div>
      <form name="normal-form" @submit.prevent="onSubmitForm">
        <div v-if="formErrors.length > 0">
          <b>Please correct the following error(s):</b>
          <div v-for="(item, index) in formErrors" :key="index">
            <span style="color: red">{{ item.text }}</span>
          </div>
        </div>
        <p>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" v-model="title">
        </p>
        <p>
          <label for="content">Content</label>
          <input type="text" name="content" id="content" v-model="content">
        </p>
        <p>
          <label for="author">Author</label>
          <input type="text" name="author" id="author" v-model="author">
        </p>
        <p>
          <input type="submit" value="Submit" :disabled="isLoadingArticleUpdate">
        </p>
      </form>
    </div>
    -->

    <!-- antd 반영 -->
    <viewUpdate
      :isLoadingArticleRead="isLoadingArticleRead"
      :isLoadingArticleUpdate="isLoadingArticleUpdate"
      :prepareData_="prepareData"
      :item="this.item" />

  </div>
</template>

<script>
import shortId from 'shortid'
import faker from 'faker'
import viewUpdate from '@/views/articles/components/viewUpdate'

export default {
  name: 'articlesCreate',

  components: {
    viewUpdate
  },

  data () {
    return {
      articleId: this.$route.params.articleId,
      formErrors: [],
      title: null,
      content: null,
      author: null,

      item: {
        id: '',
        title: '',
        content: '',
        image: '',
        author: '',
        createAt: 0
      },

      isLoadingArticleUpdate: false,
      doneArticleUpdate: false,
      errorArticleUpdate: null,

      isLoadingArticleRead: false,
      doneArticleRead: false,
      errorArticleRead: null
    }
  },

  created () {
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      this.requestReadAPI()
    },
    onClickBackBtn () {
      this.$router.push('/articles/list')
    },
    onSubmitForm (e) {
      if (this.title && this.content && this.author) {
        const values = {
          title: this.title,
          content: this.content,
          author: this.author
        }
        this.prepareData(values)
      } else {
        this.formErrors = []
        if (this.title === null || this.title === '') this.formErrors.push({ id: 'title', text: 'title required.' })
        if (this.content === null || this.content === '') this.formErrors.push({ id: 'content', text: 'content required.' })
        if (this.author === null || this.author === '') this.formErrors.push({ id: 'author', text: 'author required.' })
      }
    },
    prepareData (values) {
      const fdata = {
        id: shortId.generate(),
        title: values.title,
        content: values.content,
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: values.author,
        createAt: Date.now()
      }
      this.requestModifyAPI(fdata)
    },
    async requestReadAPI () {
      this.isLoadingArticleRead = true
      this.doneArticleRead = false
      try {
        const responseData = await this.$store.dispatch('article/ARTICLE_READ', { id: this.articleId })
        this.item = responseData
        this.isLoadingArticleRead = false
        this.doneArticleRead = true
        this.cdSetFieldsValueWithoutAntd()
      } catch (error) {
        this.isLoadingArticleRead = false
        this.errorArticleRead = error.message
      }
    },
    async requestModifyAPI (fdata) {
      this.isLoadingArticleUpdate = true
      this.doneArticleUpdate = false
      try {
        await this.$store.dispatch('article/ARTICLE_UPDATE', { id: this.articleId, fdata })
        this.isLoadingArticleUpdate = false
        this.doneArticleUpdate = true
      } catch (error) {
        this.isLoadingArticleUpdate = false
        this.errorArticleUpdate = error.message
      } finally {
        this.$router.push('/articles/list')
      }
    },
    cdSetFieldsValueWithoutAntd () {
      this.title = this.item.title
      this.content = this.item.content
      this.author = this.item.author
    }
  }

}
</script>

<style>

</style>
