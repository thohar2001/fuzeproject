<template>
  <div id="nav">
    <div><img src="..\assets\Logga.png" alt="logo" id="logo"></div>
    <router-link to="/" class="trafik">Trafik</router-link> |
    <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> |
    <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
  </div>
  <br />
  <router-view />
</template>

<style scoped>

body {
  color: white;
}

#nav {
  font-size: xx-large;
  position: relative;
  padding: 0px;
  width: 100%;
}

#logo {
  width: 3%;
  height: auto;
  position: absolute;
  left: 20px;
  align-self: auto;
}

.nav {
  background-color: white;
}

</style>

