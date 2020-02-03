<div id='Desktop' style="{background};">
  <slot>
  </slot>
</div>

<style>
  #Desktop {
    display: inline;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { thirtyMinute } from '../store/thirtyMinuteStore.js';

  export let config;

  let background;
  let lastType;

  $: background = setBackground(config);
  
  function setBackground(config) {
    var result = '';
    var types = ['pic', 'solid', 'none'];
    var usetype = config.backgroundType;
    if(config.randomAll) {
      do {
        usetype = types[(Math.floor(types.length*Math.random()))];
      } while(lastType === usetype);
      lastType = usetype;
    }

    switch(usetype) {
      case 'pic': 
        var index = config.index;
        if(config.random) {
          //
          // Get a random index for the number of images.
          //
          index = Math.floor(config.backgrounds.length*Math.random());
        }
        
        //
        // Set the background to that image.
        //
        result = 'background-image: url(\'' + config.backgrounds[index] + '\'); background-repeat: no-repeat; background-size: cover';
        break;

      case 'solid':
        var index = config.index;
        if(config.random) {
          index = Math.floor(config.backgroundColors.length*Math.random());
        }
        result = config.backgroundColors[index];
        break;
        
      case 'none':
      default:
        result = '';
    }
    return(result);
  }

  onMount(() => {
    const unsubscribeThirtyMinute = thirtyMinute.subscribe((value) => {
      if(config.update30) {
        background = setBackground(config);
      }
    });
    return(() => {
      unsubscribeThirtyMinute();
    });
  });
</script>
