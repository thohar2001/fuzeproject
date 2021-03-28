<template>
  <div id="nav">
    <div><img src="..\assets\FUZELOGGA.png" alt="logo">HELLOOO</div> 
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
</style>

