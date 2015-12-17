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
    const mood = req.params.mood;

    const x = find(receivers,function(item){
    	const index = item.bulbs.indexOf(bulbName) ;
    	if (index!== -1)
    		return true; 
    }) ;

    if (x === undefined) {
    	 var err = new restify.errors.BadRequestError('Bulb´s name does not match');


    	return next(err) ;
    }




    const endpoint = '/lights/1/state';

	const heartbeat = Object.assign({on: true, transitiontime: 5}, moods.alive.color);
	const fadeOut = Object.assign({}, heartbeat, {bri: 1, transitiontime: 5});
	const off = {on: false};

	command('PUT', endpoint, heartbeat)
	    .then(() => command('PUT', endpoint, fadeOut))
	    .then(() => command('PUT', endpoint, off))
	    .then(() => console.log('Everything fine'));
});





