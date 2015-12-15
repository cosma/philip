'use strict';

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
    activity: {type: activities.heartbeat}
  },
  happy: {},
  stressed: {},
  critical: {
    color: colors.red,
    activity: {type: activities.flashing, duration: 5}
  },
  dead: {color: colors.pink}
};

module.exports = {
  activities,
  colors,
  moods
};
