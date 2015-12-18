'use strict';

const request = require('request-promise');
const bluebird = require('bluebird');
const find = require('lodash').find;

const mappings = require('./mappings');
const receivers = mappings.receivers;

const protocol = 'http';
const base = 'api';
const token = '117eb81b3935ab6f19a21b23382b78f7';

const serviceDiscovery = 'https://www.meethue.com/api/nupnp';
let activeReceivers;
let api;
let url;

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

        const host = activeReceivers.internalipaddress;
        api = `${protocol}://${host}/${base}/${token}`;
    });
}

function command(method, endpoint, payload, explicitDelay) {
    var delay = explicitDelay || payload.transitiontime || 0;

    if (!activeReceivers) {
        return discover().then(() => command(...arguments));
    }
    url = api + endpoint;

    console.log ('Calling API:' + api);

    return request({
      method: method,
      uri: url,
      body: payload,
      json: true
    })
    .then(() => bluebird.delay(delay))
    .catch((err) => console.error(err.stack));
}

module.exports = command;
