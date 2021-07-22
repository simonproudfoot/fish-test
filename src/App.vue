<template>
  <div id="app">
    <threeTest />
  </div>
</template>

<script>
import threeTest from './components/threeTest.vue'

export default {
  name: 'App',
  components: {
    threeTest
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
