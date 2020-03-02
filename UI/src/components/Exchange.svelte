<div id='Exchange' style="top: {top}px; 
                      left: {left}px;" 
>
  <p
    style="text-shadow: {config.shadow};
           font-family: '{style.font}'; 
           font-size: {style.size}px; 
           color: {style.color};"
  >
    {#await load}
      Loading...
    {:then amount}
      1 {config.from} is {amount} {config.to}
    {:catch e}
      1 {config.from} is {savedAmount} {config.to}
    {/await}
  </p>
</div>

<style>
  #Exchange {
    position: absolute;
    font-weight: bold;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { thirtyMinute } from '../store/thirtyMinuteStore.js';

  export let top;
  export let left;
  export let style;
  export let config;
  let load;
  let savedAmount;
  
  onMount(() => {
    var unsubscribeThirtyMinute = thirtyMinute.subscribe((value) => {
      getExchangeRate();
    });
    getExchangeRate();
    return(() => {
      unsubscribeThirtyMinute();
    });
  });

  function getExchangeRate() {
    //
    // Get the current exchange rate.
    //
    load = fetch('https://api.exchangeratesapi.io/latest?symbols=' + config.from + ',' + config.to)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      savedAmount = round_to_precision(data.rates[config.to]/data.rates[config.from], 0.05);
      return(savedAmount);
    });
  }
  
  function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
</script>

