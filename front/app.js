const http = require('http');
const env = require('./env/local');
const builder = require('./builder/appBuilder');

const server = http.createServer((req, res) => {
		res.writeHead(200, {
				"Content-Type": "text/html"
		});
		builder.view(res);
		res.end();
});
server.listen(env.front, '0.0.0.0');
console.log(`listening (${env.front}) ...`);