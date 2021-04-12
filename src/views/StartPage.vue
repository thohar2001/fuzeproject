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
  top: 1;
  left:0;
  width: 100%;
  height: 100%;
}

p {
  position: relative;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15em;
  background: white;
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}
/* Change font size of logo in mobile version */
@media only screen and (max-width: 800px) {
  p {
    font-size: 5em;
    /* Margin bottom so that the logo will appear in the middle */
    margin-bottom: 2em;
  }
}
</style>