<div id='Corvid19' style="top: {top}px; 
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
    {:then data}
      {typeof data === 'undefined' ? corData.country : data.country} - Active: {typeof data === 'undefined' ?  corData.active : data.active} , Died: {typeof data === 'undefined' ?  corData.deaths : data.deaths}
    {:catch e}
      {corData.country} - Active: {corData.active} , Died: {corData.deaths}

    {/await}
  </p>
</div>

<style>
  #Corvid19 {
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
  let corData = {
    country: 'loading',
    cases: 'loading',
    active: 'loading',
    deaths: 'loading',
    todayCases: 'loading',
    todayDeaths: 'loading',
    recovered: 'loading',
    critical: 'loading',
    casesPerOneMillion: 'loading'
  };
  
  onMount(() => {
    var unsubscribeThirtyMinute = thirtyMinute.subscribe((value) => {
      getInfectionRate();
    });
    getInfectionRate();
    return(() => {
      unsubscribeThirtyMinute();
    });
  });

  function getInfectionRate() {
    //
    // Get the current information about Corvid-19 has this struture:
    //
    //country	"Thailand"
    //cases	212
    //todayCases	0
    //deaths	1
    //todayDeaths	0
    //recovered	42
    //active	169
    //critical	1
    //casesPerOneMillion	3
    //
    load = fetch('https://corona.lmao.ninja/countries/' + config.country)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      corData = data;
      return(data);
    });
  }
</script>

