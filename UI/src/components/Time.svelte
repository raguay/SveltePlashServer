<div id='Time' style="top: {top}px; 
                      left: {left}px;" 
>
  <p
    style="text-shadow: {config.shadow};
           font-family: '{style.font}'; 
           font-size: {style.size}px; 
           color: {style.color};"
  >{zhours}:{zminutes} {ampm}</p>
</div>

<style>
  #Time {
    position: absolute;
    font-weight: bold;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { Seconds } from '../store/secondStore.js'

  export let top;
  export let left;
  export let style;
  export let config;
  
  let hours = 12;
  let zhours = '12';
  let minutes = 0;
  let zminutes = '00';
  let ampm = "am";

  onMount(() => {
    var unsubscribeSeconds = Seconds.subscribe((value)=>{
      hours = Number(value.hours);
      minutes = Number(value.minutes);
      if(hours > 12) {
        hours = hours - 12;
        ampm = "pm";
      } else {
        if(hours === 12) {
          ampm = "pm";
        } else {
          ampm = "am";
        }
      }
      if(minutes < 10) {
        zminutes = '0' + minutes.toString();
      } else {
        zminutes = minutes.toString();
      }
      if(hours === 0) hours = 12;
      zhours = hours.toString();
    });
    return(() => {
      unsubscribeSeconds();
    });
  });


</script>

