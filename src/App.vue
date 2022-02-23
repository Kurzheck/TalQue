<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
#app
  font-family Helvetica, Avenir, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin 0
label
  user-select none
button
  user-select none
  outline none
  border 0px
  font-weight bold
</style>
