const request = require('request-promise');
const program = require('commander');

var host = 'http://localhost:1337';

program
  .option('-m, --mood <mood>', 'mood name')
  .option('-b, --bulb <bulb>', 'bulb name')
  .parse(process.argv);

if (program.mood && program.bulb) {
	host = `${host}/${program.bulb}/${program.mood}`;
	console.log(host);
	request(host).then(() => {
		console.log('yoo');
	});
}
