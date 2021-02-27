<template>
  <router-view v-if="prepareAuth"></router-view>
</template>

<script>
export default {
  data () {
    return {
      prepareAuth: false
    }
  },
  created () {
    this.requestAPI()
  },
  methods: {
    requestAPI () {
      this.prepareAuth = true
    }
  }
}
</script>

<style>
</style>
