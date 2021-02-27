<template>
  <div>
    <h3>
      POSTS 작성 페이지
      <button @click="onClickBackBtn">목록으로</button>
    </h3>

    <!-- 디자인 없이..
    <div>
      <div>
        isLoadingLetterAdd : {{isLoadingLetterAdd}}
      </div>
      <div>
        doneLetterAdd : {{doneLetterAdd}}
      </div>
      <div>
        errorLetterAdd : {{errorLetterAdd}}
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
          <input type="submit" value="Submit" :disabled="isLoadingLetterAdd">
        </p>
      </form>
    </div>
    -->

    <!-- antd 반영 -->
    <viewCreate
      :isLoadingLetterAdd="isLoadingLetterAdd"
      :prepareData_="prepareData" />

  </div>
</template>

<script>
import shortId from 'shortid'
import faker from 'faker'
import viewCreate from '@/views/letters/components/viewCreate'
import { apiLetterAdd } from '@/api/apiLetter'

export default {
  name: 'lettersCreate',

  components: {
    viewCreate
  },

  data () {
    return {
      formErrors: [],
      title: null,
      content: null,
      author: null,

      isLoadingLetterAdd: false,
      doneLetterAdd: false,
      errorLetterAdd: null
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
      this.$router.push('/letters/list')
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
        title: 'letters_' + values.title,
        content: values.content,
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: values.author,
        createAt: Date.now()
      }
      this.requestSaveAPI(fdata)
    },
    async requestSaveAPI (fdata) {
      this.isLoadingLetterAdd = true
      this.doneLetterAdd = false
      try {
        await apiLetterAdd(fdata)
        this.isLoadingLetterAdd = false
        this.doneLetterAdd = true
      } catch (error) {
        this.isLoadingLetterAdd = false
        this.errorLetterAdd = error.message
      } finally {
        this.$router.push('/letters/list')
      }
    }
  }

}
</script>

<style>

</style>
