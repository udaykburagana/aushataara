<template>
  <div id="app">
    <div id="nav">
      <NavBar/>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
.v-main{
   background-image: url('/steth.jpg');
   background-repeat: no-repeat;
    background-size: 100%;
}
</style>
