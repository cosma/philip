'use strict';

const restify = require('restify');
const find = require('lodash').find;

const command = require('./command');
const mappings = require('./mappings');
const receivers = mappings.receivers;
const moods = mappings.moods;

const port = 1337;
const server = restify.createServer();

server.listen(port, (e) => e ? console.error(e.stack) : console.log('listening on', port));

server.get('/:bulb/:mood', function (req, res, next) {
    const bulbName = req.params.bulb;
    const mood = moods[req.params.mood];
    const receiver = find(receivers,function(item){
    	if(item.bulbs.indexOf(bulbName) !== -1)
    		return true; 
    });

    if (receiver === undefined || mood === undefined) {
    	var err = new restify.errors.BadRequestError('Bulb´s or mood´s name does not match');
    	return next(err) ;
    }

	const bulb = receiver.bulbs.indexOf(bulbName)
    const endpoint = '/lights/'+bulb+'/state';

	const heartbeat = Object.assign({on: true, transitiontime: 5}, mood.color);
	const fadeOut = Object.assign({}, heartbeat, {bri: 1, transitiontime: 5});
	const off = {on: false};

	command('PUT', endpoint, heartbeat)
	    .then(() => command('PUT', endpoint, fadeOut))
	    .then(() => command('PUT', endpoint, off))
	    .then(() => console.log('Everything fine'));
});





