<template>
  <div id="nav">
    <router-link to="/Start" class="trafik"><img src="..\assets\Logga.png" alt="logo" id="logo"></router-link> 
    <router-link to="/" class="trafik">Trafik</router-link> 
    <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
    <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
  </div>
  <br />
  <router-view />
</template>

<style scoped>

#nav {
  font-size: large;
  position: relative;
  padding: 10px;
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
  width: 100%;
  background-color: white;
}

.trafik, .podcirkel, .populära {
  background-color: white;
  margin: 1.5%;
}

</style>

