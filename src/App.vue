<template>
  <div id="app">
    <ThreeTest />
  </div>
</template>

<script>
import ThreeTest from './components/threeTest.vue'
//import threeTest from './components/threeTest.vue'
//import robotTest from './components/robotTest.vue'

export default {
  name: 'App',
  components: {
    
    ThreeTest
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
