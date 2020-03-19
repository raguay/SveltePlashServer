<div id='Text' style="top: {top}px; 
                      left: {left}px;" 
>
  <p
    style="text-shadow: {config.shadow};
           font-family: '{style.font}'; 
           font-size: {style.size}px; 
           color: {style.color};"
  >
    {config.text}
  </p>
</div>

<style>
  #Text {
    position: absolute;
    font-weight: bold;
  }
</style>

<script>
  export let top;
  export let left;
  export let style;
  export let config;
</script>

