<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <TestChart></TestChart>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestChart from './components/TestChart.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TestChart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
