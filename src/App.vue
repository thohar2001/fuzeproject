<template>
    <Menu></Menu>
    <br>
    <Footer></Footer>
</template>

<script>
import Menu from '../src/components/Menu.vue'
import Footer from '../src/components/Footer.vue'

export default {
  components: {
    Menu,
    Footer,
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  padding: 30px;
}

</style>
