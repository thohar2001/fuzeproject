<template>
  <div id="nav">
    <router-link to="/">Trafik meddelanden</router-link> |
    <router-link to="/podtree">Pod Trädet</router-link> |
    <router-link to="/musictimeline">Musik timeline</router-link>
  </div>
  <br />
  <router-view />
</template>

<style scoped>
#nav {
  border: 2px solid black;
  padding: 0.5em;
  font-size: xx-large;
  background-color: grey;
  position: relative;
  width: 100%;
}
</style>

