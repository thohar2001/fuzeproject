<template>
  <div id="nav" >
    <router-link id="startLink" to="/" class="trafik"><img src="..\assets\FUZE_logo_red.png" alt="logo" id="logo"></router-link>
    <div id="linkNav" >
      <router-link to="/TrafficMessages" class="trafik">Trafik</router-link> 
      <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
      <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
    </div>
    <router-link id="aboutLink" to="/About">Om FUZE</router-link>
  </div>
    <router-link to="/About" class="aboutusmobile">i</router-link>
  <br><br>
  <router-view />
  <br>
  <br>
  <br>
  <div id="bottomNav">
      <router-link id="startLink" to="/" class="trafik"><img src="..\assets\FUZE_logo_red.png" alt="logo" id="logo"></router-link>
      <router-link to="/TrafficMessages" class="trafik">Trafik</router-link> 
      <router-link to="/PodListing" class="podcirkel">Podcirkeln</router-link> 
      <router-link to="/musictimeline" class="populära">Topplåtar</router-link>
  </div>
</template>

<style scoped>

#bottomNav {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4em;
  text-align: left;
  position: fixed;
  bottom: 0px;
  background-color: white; 
  font-size: medium; 
  font-weight: bold;
}

#nav {
  text-align: left;
  position: fixed;
}

#linkNav {
  display: flex;
  justify-content:space-around;
  display: inline;
  margin-left: 5%;
  background-color: white;
}

#linkNav router-link {
  margin-left: 40px;
  margin-right: 40px;
}

#aboutLink {
  text-decoration: none;
  float:right;
  color: #7E163B;
  background-color: white;
}

router-link {
  display: inline; 
}

#nav {
  font-size: large;
  padding: 10px;
  width: 100%;
  z-index: 1;
  background-color: white;
}

#logo {
  width: 3em;
  height: auto;
  position: absolute;
  left: 20px;
  align-self: auto;
  background-color: white;
}

.trafik, .podcirkel, .populära {
  text-decoration: none;
  margin: 1.3em;
  background-color: white;
  color: #25283C;
  justify-content: space-evenly;
}
/* display about us as icon when in mobile version */
.aboutusmobile {
  font-weight: 800;
  width: 30px;
  border-radius: 50%;
  border: solid white;
  margin-top: 10px;
  margin-right: 15px;
  text-decoration: none;
  float:right;
  color: #ffffff;
  background-color: #25283C;
}

/* removes the bottom navigation bar when in desktop */
@media only screen and (min-width: 633px) {
  #bottomNav {
    display: none;
    
  }
}

/* removes the top navigation bar when in mobile */
@media only screen and (max-width: 633px) {
  #nav {
    display: none;
  } 

  /* Make FUZE logo smaller and sit to the left on then nav bar  */ 
  #logo {
  bottom: 23px;
  width: 1.5em;
  height: auto;
  position: absolute;
  left: 5px;
  align-self: auto;
  background-color: white;
  }
}

</style>

