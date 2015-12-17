const request = require('request-promise');

var host = 'http://localhost:1337/phpWoker/critical';

request(host).then(() => {
	console.log('yoo');
});