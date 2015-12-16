'use strict';

const request = require('request-promise');
const bluebird = require('bluebird');
const find = require('lodash.find');

const mappings = require('./mappings');
const receivers = mappings.receivers;

const serviceDiscovery = 'https://www.meethue.com/api/nupnp';
let activeReceivers;

function discover() {
    return request(serviceDiscovery).then((body) => {
        const res = JSON.parse(body);
        const withIps = res.map((receiver) => {
            const item = find(receivers, {id: receiver.id});
            return Object.assign(receiver, item);
        });

        activeReceivers = withIps.reduce(
            (memo, r) => Object.assign(memo, {[r.name]: r.internalipaddress})
        );
    });
}

function command(method, resource, payload, explicitDelay) {
    var delay = explicitDelay || payload.transitiontime || 0;

    if (!activeReceivers) {
        return discover().then(() => command(...arguments));
    }

    return request({
      method: method,
      uri: resource,
      body: payload,
      json: true
    })
    .then(() => bluebird.delay(delay))
    .catch((err) => console.error(err.stack));
}

module.exports = command;
