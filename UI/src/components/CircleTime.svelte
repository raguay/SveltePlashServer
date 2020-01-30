<div id='CircleTime' style="top: {top}px; left: {left}px;">
  <CircleMeter 
    top=0
    left=0
    style={style}
    config={hourConfig}
    percent={hourPercent}
  />
  <CircleMeter 
    top={innerTop}
    left={innerLeft}
    style={style}
    config={minConfig}
    percent={minPercent}
  />
</div>

<style>
  #CircleTime {
    position: absolute;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { Seconds } from '../store/secondStore.js';
  import CircleMeter from './CircleMeter.svelte';

  export let top;
  export let left;
  export let style;
  export let config;

  let minPercent;
  let hourPercent;
  let innerTop = config.lineWidth+(config.gap/2);
  let innerLeft = config.lineWidth+(config.gap/2);
  let hours = 1;
  let minutes = 1;
  
  let minConfig = {
    width: config.radius*2-(config.lineWidth*2+config.gap),
    height: config.radius*2-(config.lineWidth*2+config.gap),
    lineWidth: config.lineWidth,
    strokeStyle: config.strokeStyleMin
  };
  let hourConfig = {
    width: config.radius*2,
    height: config.radius*2,
    lineWidth: config.lineWidth,
    strokeStyle: config.strokeStyleHour
  };
  
  onMount(() => {
    var unsubscribeSeconds = Seconds.subscribe((value)=>{
      hours = Number(value.hours);
      minutes = Number(value.minutes);
      calPercent();
    });
    var dt = new Date();
    minutes = Number(dt.getMinutes());
    hours = Number(dt.getHours());
    calPercent();
    return(() => {
      unsubscribeSeconds();
    });
  });

  function calPercent() {
    if(hours > 12.0) {
      hours = hours - 12.0;
    }
    if(minutes === 0) minutes = 60.0;
    if(hours === 0) hours = 12.0;
    minPercent = (minutes/60.0) * 100.0;
    hourPercent = (hours/12.0) * 100.0;
  }
</script>
