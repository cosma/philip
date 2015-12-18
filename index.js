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
    const receiver = find(receivers, function (item) {
        return item.bulbs.indexOf(bulbName) !== -1;
    });

    if (!receiver || !mood) {
        let err = new restify.errors.BadRequestError('Bulb´s or mood´s name does not match');
        return next(err);
    }

    const bulb = receiver.bulbs.indexOf(bulbName);
    const endpoint = `/lights/${bulb}/state`;

    let action;
    switch (mood.activity) {
        case 'smooth':
            action = smoothBlink;
            break;
        case 'flashing':
            action = blink;
            break;
        case 'constant':
        default:
            action = continous;
    }


    return action(endpoint, mood)
        .then(() => console.log('Everything fine'))
        .then(() => res.send(200));
});


function smoothBlink(endpoint, mood) {
    const fadeIn = Object.assign({on: true, transitiontime: 5}, mood.color);
    const fadeOut = Object.assign({}, fadeIn, {bri: 1, transitiontime: 5});
    const off = {on: false};

    return command('PUT', endpoint, fadeIn)
        .then(() => command('PUT', endpoint, fadeOut))
        .then(() => command('PUT', endpoint, off));
}

function blink(endpoint, mood) {
    var payload = Object.assign({alert: 'select'}, mood.color);
    const off = {on: false};

    return command('PUT', endpoint, payload, 15000)
        .then(() => command('PUT', endpoint, off));
}

function continous(endpoint, mood) {
    const payload = Object.assign({on: true}, mood.color);
    return command('PUT', endpoint, payload);
}
