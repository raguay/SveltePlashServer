<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One&display=swap" rel="stylesheet">
</svelte:head>

<Desktop config={config} >
  {#each widgets as widget}
    <svelte:component 
      this={widget.widget} 
      top={widget.top}
      left={widget.left}
      style={widget.style}
      config={widget.config}
    />
  {/each}
</Desktop>

<style>
  :global(body) {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import {onMount} from 'svelte';
  import { Seconds } from './store/secondStore.js';
  import { thirtyMinute } from './store/thirtyMinuteStore.js';
  import Desktop from './components/Desktop.svelte';

  export let widgets = [];
  export let config = {};
  
  let thirtyCount = 0;

  onMount(() => {
    var unsubscribeSeconds = Seconds.subscribe((value)=>{
    });
    UpdateTimeSeconds();
    UpdateTimeThirtyMinutes();
    return(() => {
      unsubscribeSeconds();
    });
  });

  function UpdateTimeSeconds() {
      //
      // Set the new date in the seconds store for everyone to
      // use.
      //
      var ct = new Date();
      var min = ct.getMinutes();
      Seconds.set({
        hours: ct.getHours(),
        minutes: min
      });
      setTimeout(UpdateTimeSeconds, 1000);
  }

  function UpdateTimeThirtyMinutes() {
      thirtyCount += 1;
      thirtyMinute.set(thirtyCount);
      setTimeout(UpdateTimeThirtyMinutes, 30*60*1000);
  }
</script>

