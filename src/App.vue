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

<style>


h1 {
  font-size: 3em;
}

#app {
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: rgb(255, 255, 255);
}

#nav a.router-link-exact-active {
  color: #838383;
}

footer {
  padding: 30px;
}

</style>
