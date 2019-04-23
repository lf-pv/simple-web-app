const express = require('express');
const env = require('./env/local');
const bodyParser = require('body-parser');
const applisten = express();
const answerModule = require('./modules/answer.js');

applisten.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
});
applisten.use(bodyParser.json());

applisten.listen(env.port, '0.0.0.0');
console.log(`listening (${env.port}) ...`);

// respond with "Coucou" 
applisten.put('/', function (req, res) {
		const rep = answerModule.hello();
		const data = {
				'data': rep,
				'success': true,
				'error': null
		}
		res.status(200).send(data);
})