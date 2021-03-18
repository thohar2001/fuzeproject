<template>
  <canvas id="vl" width="800" height="800"></canvas>
</template>

<script>
export default {
  name: "Podtree",

  methods: {
    drawBranch(context, moveToX, moveToY, lineToX, lineToY) {
      context.beginPath();
      context.moveTo(moveToX, moveToY);
      context.lineTo(lineToX, lineToY);
      context.lineWidth = 5;
      // set line color black
      context.strokeStyle = "#000000";
      context.stroke();
    },

    // drawBubble(context, xPos, yPos, text, strokeStyle) {
    //   context.beginPath();
    //   context.lineWidth = 7;
    //   context.arc(95, 30, 40, 0, 2 * Math.PI);
    //   context.stroke();
    //   context.font = "10px Arial bold";
    //   context.fillText("Hello World", 65, 25);
    // }
  },

  mounted() {
    let canvas = document.getElementById("vl");
    let context = canvas.getContext("2d");  
    this.drawBranch(context, canvas.width/2, canvas.height/7, canvas.width/2, canvas.height);
    this.drawBranch(context, canvas.width/2, canvas.height*(3/5), canvas.width/4, canvas.height/2.2);

    this.drawBranch(context, canvas.width/2, canvas.height*0.9, canvas.width/4, canvas.height/1.3);

        // branches right side
    this.drawBranch(context, canvas.width/2, canvas.height/2.2, canvas.width/1.3, canvas.height/4);

    this.drawBranch(context, canvas.width/2, canvas.height/1.3, canvas.width/1.3, canvas.height/1.7);
  }
};

</script>

<style>
    canvas {
        background-color: rgb(255, 255, 255);
        border: 1px solid black;
    }
</style>
