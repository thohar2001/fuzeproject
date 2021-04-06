<template>
  <div id="nav">
    <div><img src="..\assets\Logga.png" alt="logo" id="logo"></div>
    <router-link to="/" class="trafik">Trafik</router-link> 
    <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
    <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
    <router-link to="/About" class="omfuze">OM fuze</router-link>
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

.trafik, .podcirkel, .populära, .omfuze {
  background-color: white;
  margin: 1.5%;

}


</style>

