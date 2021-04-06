<template>

    <div>
    <p>Shining Text Animation Effects</p>
    </div>
</template>

<script>


</script>


<style scoped>

div {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #000;

  position:fixed;
  padding:0;
  margin:0;

  top: 0;
  left:0;
  z-index: 0;
  width: 100%;
  height: 100%;
}

p {
  position: relative;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 100%;
  animation: animate 3s;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}

</style>