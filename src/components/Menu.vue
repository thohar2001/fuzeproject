<template>
  <div id="nav">
    <div><img src="..\assets\Logga.png" alt="logo" id="logo"></div>
    <router-link to="/" class="trafik">Trafik</router-link> 
    <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
    <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
  </div>
  <br />
  <router-view />
</template>

<style scoped>

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

#nav {
  color: #25283C;
  background-color: white;
}

.trafik, .podcirkel, .populära {

  background-color: white;
}

</style>

