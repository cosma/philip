'use strict';

const restify = require('restify');

const command = require('./command');
const mappings = require('./mappings');
const moods = mappings.moods;

const receivers = mappings.receivers;

const protocol = 'http';
const host = '10.10.13.33';
const base = 'api';
const token = '117eb81b3935ab6f19a21b23382b78f7';
const api = `${protocol}://${host}/${base}/${token}`;

const port = 1337;
const server = restify.createServer();

server.listen(port, (e) => e ? console.error(e.stack) : console.log('listening on', port));

server.get('/:receiver/:bulb/:mood', function (req, res) {
    const receiver = req.params.receiver;
    const bulb = req.params.bulb;
    const mood = req.params.mood;
});

const endpoint = '/lights/1/state';
const url = api + endpoint;

console.log('Using API URL:', url);

const heartbeat = Object.assign({on: true, transitiontime: 5}, moods.alive.color);
const fadeOut = Object.assign({}, heartbeat, {bri: 1, transitiontime: 5});
const off = {on: false};

command('PUT', url, heartbeat)
    .then(() => command('PUT', url, fadeOut))
    .then(() => command('PUT', url, off))
    .then(() => console.log('Everything fine'));

