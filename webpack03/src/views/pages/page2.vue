<template>
  <div>
    <div>
      <h3>page 2</h3>
      <div>인증 페이지</div>
    </div>
    <div v-if="prepareAuth">
      인증된 사용자에게 보입니다.
    </div>
    <div v-else>
      인증되지 않은 사용자에게 보입니다.
    </div>

  </div>
</template>

<script>

export default {
  name: 'page2',
  components: {
  },
  data () {
    return {
      prepareAuth: false
    }
  },
  created () {
    this.requestCheckAuthAPI()
  },
  methods: {
    requestCheckAuthAPI () {
      const token = this.$store.getters['auth/getUser'].token
      console.log('token :', token)
      if (token && token !== undefined) {
        this.prepareAuth = true
      }
    }
  }
}
</script>

<style>

</style>
