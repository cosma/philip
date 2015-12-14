'use strict';

const colors = {
  white: {
    hue: 6000,
    bri: 240,
    sat: 50
  },
  green: {
    hue: 15000,
    bri: 255,
    sat: 255
  }
};

const activities = {
  heartbeat: {alert: 'select'},
  flashing: {alert: 'lselect'},
  stopFlashing: {alert: 'none'}
};

const mood = {
  alive: {
    color: colors.white,
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
  mood,
  foo
};
