'use strict';

const request = require('request-promise');
const path = require('path');

const mappings = require('./mappings');
const moods = mappings.moods;

const host = 'http://10.10.13.73';
const base = '/api/117eb81b3935ab6f19a21b23382b78f7';
const endpoint = '/lights/2/state';

const url = host + path.join(base, endpoint);

const heartbeat = Object.assign({on: true}, moods.alive.color, moods.alive.activity.type);
const off = mappings.activities.off;

console.log(url);

console.log(JSON.stringify(heartbeat, null, 2));

request({
  method: 'PUT',
  uri: url,
  body: heartbeat,
  json: true
})
.then(() => request({
    method: 'PUT',
    uri: url,
    body: off,
    json: true
  })
)
.then(() => console.log('Everything fine'))
.catch((err) => console.error(err.stack));
