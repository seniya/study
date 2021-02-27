<template>
  <div id="app">
    <mainMenu />
    <div style="padding: 10px;">
      <router-view />
    </div>
  </div>
</template>

<script>
import mainMenu from '@/components/mainMenu'

export default {
  name: 'App',
  components: {
    mainMenu
  },

  created () {
    console.log('process.env.VUE_APP_API_URL : ', process.env.VUE_APP_API_URL)
  }

}
</script>

<style>
</style>
