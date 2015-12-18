'use strict';

const request = require('request-promise');
const program = require('commander');

var host = 'http://localhost:1337';

program
  .option('-m, --mood <mood>', 'mood name')
  .option('-b, --bulb <bulb>', 'bulb name')
  .parse(process.argv);

if (program.mood && program.bulb) {
    let endpoint = `${host}/${program.bulb}/${program.mood}`;
    console.log(host);
    request(endpoint).then(() => {
        console.log(`Told my mood, and it's "${program.mood}"`);
    });
}
