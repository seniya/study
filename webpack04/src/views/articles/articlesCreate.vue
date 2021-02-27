<template>
  <div>
    <h3>
      POSTS 작성 페이지
      <button @click="onClickBackBtn">목록으로</button>
    </h3>

    <!-- 디자인 없이..
    <div>
      <div>
        isLoadingArticleAdd : {{isLoadingArticleAdd}}
      </div>
      <div>
        doneArticleAdd : {{doneArticleAdd}}
      </div>
      <div>
        errorArticleAdd : {{errorArticleAdd}}
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
          <input type="submit" value="Submit" :disabled="isLoadingArticleAdd">
        </p>
      </form>
    </div>
    -->

    <!-- antd 반영 -->
    <viewCreate
      :isLoadingArticleAdd="isLoadingArticleAdd"
      :prepareData_="prepareData" />

  </div>
</template>

<script>
import shortId from 'shortid'
import faker from 'faker'
import viewCreate from '@/views/articles/components/viewCreate'

export default {
  name: 'articlesCreate',

  components: {
    viewCreate
  },

  data () {
    return {
      formErrors: [],
      title: null,
      content: null,
      author: null,

      isLoadingArticleAdd: false,
      doneArticleAdd: false,
      errorArticleAdd: null
    }
  },

  created () {
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      // console.log('initialize 아무것도 안함')
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
        // console.log('this.formErrors : ', this.formErrors)
      }
    },
    prepareData (values) {
      const fdata = {
        id: shortId.generate(),
        title: 'articles_' + values.title,
        content: values.content,
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: values.author,
        createAt: Date.now()
      }
      this.requestSaveAPI(fdata)
    },
    async requestSaveAPI (fdata) {
      this.isLoadingArticleAdd = true
      this.doneArticleAdd = false
      try {
        await this.$store.dispatch('article/ARTICLE_ADD', { fdata })
        this.isLoadingArticleAdd = false
        this.doneArticleAdd = true
      } catch (error) {
        this.isLoadingArticleAdd = false
        this.errorArticleAdd = error.message
      } finally {
        this.$router.push('/articles/list')
      }
    }
  }

}
</script>

<style>

</style>
