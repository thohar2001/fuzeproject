<template>
  <div id="nav">
    <router-link to="/Start" class="trafik"><img src="..\assets\Logga.png" alt="logo" id="logo"></router-link> 
    <router-link to="/" class="trafik">Trafik</router-link> 
    <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
    <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
    <router-link to="/About" class="omfuze">Om FUZE</router-link>
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
  z-index: 1;
}

#logo {
  width: 3em;
  height: auto;
  position: absolute;
  left: 20px;
  align-self: auto;
  background-color: white;
  
}

#nav {
  width: 100%;
  background-color: white;
}

.omfuze {
  float: right;
  color: #7E163B;
  background-color: white;
}

.trafik, .podcirkel, .populära {
  background-color: white;
  color: #25283C;;
  margin: 2em;
}


</style>

