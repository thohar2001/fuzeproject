<template>
  <div id="nav">
    <div><img src="..\assets\Logga.png" alt="logo" id="logo"></div> 
    <router-link to="/">Trafikmeddelanden</router-link> |
    <router-link to="/PodListing">PodListing</router-link> |
    <router-link to="/musictimeline">Musik timeline</router-link>
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
  width: 10%;
  height: auto;
  position: absolute;
  left: 20px;
  top: 20px;
  
}
</style>

