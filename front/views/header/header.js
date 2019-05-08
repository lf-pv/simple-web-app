const fs = require("fs");

const render = () => {
	return fs.readFileSync('./views/header/header.html', 'utf8');
}

module.exports.render = render;