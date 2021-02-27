<template>
  <div>
    <h3>
      Letters 수정 페이지
      <button @click="onClickBackBtn">목록으로</button>
    </h3>

    <!-- 디자인 없이..
    <div>
      <div>
        isLoadingLetterRead : {{isLoadingLetterRead}}
      </div>
      <div>
        isLoadingLetterUpdate : {{isLoadingLetterUpdate}}
      </div>
      <div>
        doneLetterUpdate : {{doneLetterUpdate}}
      </div>
      <div>
        errorLetterUpdate : {{errorLetterUpdate}}
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
          <input type="submit" value="Submit" :disabled="isLoadingLetterUpdate">
        </p>
      </form>
    </div>
    -->

    <!-- antd 반영 -->
    <viewUpdate
      :isLoadingLetterRead="isLoadingLetterRead"
      :isLoadingLetterUpdate="isLoadingLetterUpdate"
      :prepareData_="prepareData"
      :item="this.item" />

  </div>
</template>

<script>
import shortId from 'shortid'
import faker from 'faker'
import viewUpdate from '@/views/letters/components/viewUpdate'
import { apiLetterRead, apiLetterUpdate } from '@/api/apiLetter'

export default {
  name: 'lettersCreate',

  components: {
    viewUpdate
  },

  data () {
    return {
      letterId: this.$route.params.letterId,
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

      isLoadingLetterUpdate: false,
      doneLetterUpdate: false,
      errorLetterUpdate: null,

      isLoadingLetterRead: false,
      doneLetterRead: false,
      errorLetterRead: null
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
      this.isLoadingLetterRead = true
      this.doneLetterRead = false
      try {
        const { data } = await apiLetterRead(this.letterId)
        this.item = data
        this.isLoadingLetterRead = false
        this.doneLetterRead = true
        this.cdSetFieldsValueWithoutAntd()
      } catch (error) {
        this.isLoadingLetterRead = false
        this.errorLetterRead = error.message
      }
    },
    async requestModifyAPI (fdata) {
      this.isLoadingLetterUpdate = true
      this.doneLetterUpdate = false
      try {
        await apiLetterUpdate(this.letterId, fdata)
        this.isLoadingLetterUpdate = false
        this.doneLetterUpdate = true
      } catch (error) {
        this.isLoadingLetterUpdate = false
        this.errorLetterUpdate = error.message
      } finally {
        this.$router.push('/letters/list')
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
