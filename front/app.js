const http = require('http');
const appBuilder = require("./struct.js");

const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(appBuilder.renderApp);
    res.end();
});
server.listen(7357, '0.0.0.0');
console.log('listening (7357) ...');