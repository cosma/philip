'use strict';

const receivers = [{
  name: 'second',
  id: '00879867898fead3',
  bulbs: []
}, {
  name: 'berlin',
  id: '001788fffe17fba7',
  bulbs: ['phpWoker', 'htmlWorker', 'ydService']
}];

const colors = {
  white: {
    hue: 6000,
    bri: 240,
    sat: 50
  },
  green: {
    hue: 25500,
    bri: 187,
    sat: 255
  },
  yellow: {
    hue: 15000,
    bri: 255,
    sat: 255
  },
  orange: {
    hue: 6500,
    bri: 187,
    sat: 255
  },
  red: {
    hue: 1000,
    bri: 187,
    sat: 255
  },
  blue: {
    hue: 46920,
    bri: 187,
    sat: 255
  }
};

const activities = {
  heartbeat: {alert: 'select'},
  flashing: {alert: 'lselect'},
  stopFlashing: {alert: 'none'},
  off: {on: false}
};

const moods = {
  alive: {
    color: colors.blue,
    activity: 'smooth'
  },
  happy: {
    color: colors.green,
    activity: 'smooth'
  },
  stressed: {
    color: colors.orange,
    activity: 'flashing'
  },
  critical: {
    color: colors.red,
    activity: 'flashing'
  },
  dead: {
    color: colors.pink,
    activity: 'constant'
  }
};

module.exports = {
  activities,
  receivers,
  colors,
  moods
};
