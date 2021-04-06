<template>
    <Menu></Menu>
    <br>
</template>

<script>
import Menu from '../src/components/Menu.vue'

export default {
  components: {
    Menu,
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
}


#nav a.router-link-exact-active {
  color: #838383;
}

</style>
