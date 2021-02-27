<template>
  <div>
    <div>
      <h3>
        Letters 상세 페이지
        <button @click="onClcikRefreshBtn">새로고침</button>
      </h3>
    </div>

    <!-- 디자인 없이..
    <p>isLoadingLetterRead: {{isLoadingLetterRead}}</p>
    <p>doneLetterRead: {{doneLetterRead}}</p>
    <p>errorLetterRead: {{errorLetterRead}}</p>

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
      :isLoadingLetterRead="isLoadingLetterRead"
      :doneLetterRead="doneLetterRead"
      :isLoadingLetterRemove="isLoadingLetterRemove"
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
import viewRead from '@/views/letters/components/viewRead'
import { apiLetterRead, apiLetterRemove } from '@/api/apiLetter'

export default {
  name: 'lettersRead',

  components: {
    displayTime,
    viewRead
  },

  data () {
    return {
      letterId: this.$route.params.letterId,
      item: {
        id: '',
        title: '',
        content: '',
        image: '',
        author: '',
        createAt: 0
      },
      isLoadingLetterRead: false,
      doneLetterRead: false,
      errorLetterRead: null,

      isLoadingLetterRemove: false,
      doneLetterRemove: false,
      errorLetterRemove: null
    }
  },

  created () {
    console.log('viewRead : ', viewRead)
    this.initialize()
  },

  /* request, prepare, on, cb, action */
  methods: {
    initialize () {
      if (this.item.id !== this.letterId) {
        this.requestAPI()
      }
    },
    async requestAPI () {
      this.isLoadingLetterRead = true
      this.doneLetterRead = false
      try {
        const { data } = await apiLetterRead(this.letterId)
        this.item = data
        this.isLoadingLetterRead = false
        this.doneLetterRead = true
      } catch (error) {
        this.isLoadingLetterRead = false
        this.errorLetterRead = error.message
      }
    },
    onClcikRefreshBtn () {
      this.$store.commit('letter/reSetItem')
      this.requestAPI()
    },
    onClickBackBtn () {
      this.$router.push('/letters/list')
    },
    onClickEditBtn (letterId) {
      this.$router.push(`/letters/update/${letterId}`)
    },
    async onClickDeleteBtn (letterId) {
      this.isLoadingLetterRemove = true
      this.doneLetterRemove = false
      try {
        await apiLetterRemove(this.letterId)
        this.isLoadingLetterRemove = false
        this.doneLetterRemove = true
        this.$router.push('/letters/list')
      } catch (error) {
        this.isLoadingLetterRemove = false
        this.errorLetterRemove = error.message
      }
    }
  }

}
</script>

<style>

</style>
