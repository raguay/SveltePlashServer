import UI from './UI.svelte';
import Time from './components/Time.svelte';
import CircleTime from './components/CircleTime.svelte';
import Exchange from './components/Exchange.svelte';
import Corvid19 from './components/Corvid19.svelte';
import Text from './components/Text.svelte';

//
// Create the configuration and widgets structures for configuring
// the desktop. This is the only area the user should have to change.
// Well, other than creating new widgets!
//
const widgets = [{
  name: 'Corvd19Text',
  widget: Text,
  top: 700,
  left: 100,
  style: {
    font: 'Alfa Slab One',
    size: 30,
    color: 'lightblue'
  },
  config: {
    text: 'Corvid-19 Cases',
    shadow: '1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black, 5px 5px 0px black, 6px 6px 2px black'
  }},{
  name: 'Corvid19-US',
  widget: Corvid19,
  top: 780,
  left: 35,
  style: {
    font: 'Alfa Slab One',
    size: 30,
    color: 'lightblue'
  },
  config: {
    country: 'usa',
    shadow: '1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black, 5px 5px 0px black, 6px 6px 2px black'
  }},{
  name: 'Corvid19-Thailand',
  widget: Corvid19,
  top: 740,
  left: 35,
  style: {
    font: 'Alfa Slab One',
    size: 30,
    color: 'lightblue'
  },
  config: {
    country: 'thailand',
    shadow: '1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black, 5px 5px 0px black, 6px 6px 2px black'
  }},{
  name: 'Exchange',
  widget: Exchange,
  top: 220,
  left: 35,
  style: {
    font: 'Alfa Slab One',
    size: 30,
    color: 'lightblue'
  },
  config: {
    key: '6d345f490e76035ffa407757',
    from: 'USD',
    to: 'THB',
    shadow: '1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black, 5px 5px 0px black, 6px 6px 2px black'
  }
  },{
  name: 'Time',
  widget: Time,
  top: 145,
  left: 35,
  style: {
    font: 'Alfa Slab One',
    size: 40,
    color: 'white'
  },
  config: {
    shadow: '1px 1px 0px black, 2px 2px 0px black, 3px 3px 0px black, 4px 4px 0px black, 5px 5px 0px black, 6px 6px 2px black'
  }
}, {
  name: 'CircleTime',
  widget: CircleTime,
  top: 20,
  left: 50,
  style: {
    font: 'Arial',
    size: 500,
    color: 'white'
  },
  config: {
    radius: 80,
    lineWidth: 10,
    strokeStyleMin: 'blue',
    strokeStyleHour: 'green',
    gap: 10
  }
}];

const config = {
  backgroundType: 'none',
  backgrounds: ['https://source.unsplash.com/random/1440x900?puppy', 
                'https://source.unsplash.com/random/1440x900?kitten',
                'https://source.unsplash.com/random/1440x900?glider',
                'https://source.unsplash.com/random/1440x900?galaxy',
                'http://www.talencia.cat/mypics/max/1/16113_stars-backgrounds.png'],
  backgroundColors: ['background: linear-gradient(to left top, blue, red) fixed',
                     'background-color: teal',
                     'background-color: lightblue',
                     'background: linear-gradient(to right top, teal, lightgreen)',
                     'background-color: #08AEEA; background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
                     'background-color: #21D4FD; background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
                     'background-color: #8EC5FC; background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
                     'background: linear-gradient(to left top, blue, lightgreen)'],
  random: false,
  index: 0,
  randomAll: false,
  update30: true
};

const ui = new UI({
  target: document.body,
  props: {
    widgets: widgets,
    config: config
  }
});

export default ui;
