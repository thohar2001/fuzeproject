<template>

    <div>
    <p>FUZE</p>
    </div>
</template>

<script>


</script>


<style scoped>

div {
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15em;
  overflow: hidden;
  background: white;
  background-repeat: no-repeat;
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@media only screen and (max-width: 800px) {
  p {
    font-size: 5em;
  }
}
</style>