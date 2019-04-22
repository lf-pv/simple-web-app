const http = require('http');
const builder = require('./builder/appBuilder')

const server = http.createServer((req, res) => {
		res.writeHead(200, {
				"Content-Type": "text/html"
		});
		builder.view(res);
		res.end();
});
server.listen(7357, '0.0.0.0');
console.log('listening (7357) ...');