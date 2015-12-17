'use strict';

const restify = require('restify');

const command = require('./command');
const mappings = require('./mappings');
const moods = mappings.moods;

const port = 1337;
const server = restify.createServer();

server.listen(port, (e) => e ? console.error(e.stack) : console.log('listening on', port));

server.get('/:receiver/:bulb/:mood', function (req, res) {
    const receiver = req.params.receiver;
    const bulb = req.params.bulb;
    const mood = req.params.mood;
    const endpoint = '/lights/1/state';

	const heartbeat = Object.assign({on: true, transitiontime: 5}, moods.alive.color);
	const fadeOut = Object.assign({}, heartbeat, {bri: 1, transitiontime: 5});
	const off = {on: false};

	command('PUT', endpoint, heartbeat)
	    .then(() => command('PUT', endpoint, fadeOut))
	    .then(() => command('PUT', endpoint, off))
	    .then(() => console.log('Everything fine'));
});





