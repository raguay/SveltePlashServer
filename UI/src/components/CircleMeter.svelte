<canvas 
  bind:this={arcCanvas}
  width="{config.width}" 
  height="{config.height}"
  style="top: {top}px; left: {left}px; font-family: {style.font};"
>
  <p>Your browser does not support the HTML5 canvas tag.</p>
</canvas>

<style>
  canvas {
    position: absolute;
  }
</style>

<script>
  export let top;
  export let left;
  export let style;
  export let config;
  export let percent;
  
  let arcCanvas;
  let ctx = null;
  
  $: (percent !== 'undefined')&&(percent !== 0) ? drawCanvas(percent) : 1;
  
  function clearCanvas(context) {
    // Store the current transformation matrix
    context.save();

    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, config.width, config.height);

    // Restore the transform
    context.restore();
  }
  
  function drawCanvas(percent) {
    if((typeof arcCanvas !== 'undefined')&&(arcCanvas !== null)) {
      var rad1 = (config.height/2);
      var rad2 = (config.height/2)-(config.lineWidth/2);
      if(ctx === null) {
        //
        // Setup the canvas.
        //
        ctx = arcCanvas.getContext("2d");
        ctx.lineWidth = config.lineWidth;
        ctx.strokeStyle = config.strokeStyle;
        ctx.beginPath();

        //
        // Translate the matrix to put the start of the circle
        // at the top.
        //
        ctx.translate(rad1,rad1);
        ctx.rotate(-Math.PI/2);
        ctx.translate(-rad1,-rad1);

        //
        // draw the circle.
        //
        ctx.lineCap = "round";
        ctx.arc(rad1, rad1, rad2, 0, (2 * (percent/100)) * Math.PI);
        ctx.stroke();
      } else {
        //
        // draw the circle after clearing the canvas.
        //
        ctx.beginPath();
        clearCanvas(ctx);
        ctx.arc(rad1, rad1, rad2, 0, (2 * (percent/100)) * Math.PI);
        ctx.stroke();
      }
    }
  }
</script> 
