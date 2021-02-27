<template>
  <div>
    <div>
      <h3>
        Letters 목록 페이지
        <button @click="onClcikRefreshBtn">새로고침</button>
        &nbsp;&nbsp;
        <button @click="onClcikCreateBtn">새글작성</button>
      </h3>
    </div>

    <!-- 디자인 없이..
    <div>
      isLoadingLetterItems : {{isLoadingLetterItems}}
    </div>
    <div>
      doneLetterItems : {{doneLetterItems}}
    </div>
    <div>
      errorLetterItems : {{errorLetterItems}}
    </div>
    <div v-for="(item, index) in items" :key="item.id + index">
      <span>
        <router-link :to="{ name: 'lettersRead', params: { letterId: item.id }}">title : {{ item.title }}</router-link>
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
      :isLoadingLetterItems="isLoadingLetterItems"
      :doneLetterItems="doneLetterItems"
      :onClickMoreBtn_="onClickMoreBtn"
      :onClickEditBtn_="onClickEditBtn"
      :onClickReadBtn_="onClickReadBtn" />

  </div>
</template>

<script>
import viewList from '@/views/letters/components/viewList'
import { apiLetters } from '@/api/apiLetter'

export default {
  name: 'lettersList',
  components: {
    viewList
  },
  data () {
    return {
      items: [],
      isLoadingLetterItems: false,
      doneLetterItems: false
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
      this.isLoadingLetterItems = true
      this.doneLetterItems = false
      try {
        const { data } = await apiLetters({})
        const newItems = [...this.items, ...data]
        this.items = newItems
        this.isLoadingLetterItems = false
        this.doneLetterItems = true
      } catch (error) {
        this.isLoadingLetterItems = false
        this.errorLetterItems = error.message
      }
    },
    async onClickMoreBtn () {
      this.requestAPI()
    },
    onClcikRefreshBtn () {
      this.$store.commit('letter/reSetItems')
      this.requestAPI()
    },
    onClickEditBtn (letterId) {
      this.$router.push(`/letters/update/${letterId}`)
    },
    onClickReadBtn (letterId) {
      this.$router.push(`/letters/read/${letterId}`)
    },
    onClcikCreateBtn () {
      console.log('onClcikCreateBtn /letters/create')
      this.$router.push('/letters/create')
    }
  }

}
</script>

<style>
</style>
