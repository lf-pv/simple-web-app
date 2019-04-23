const fs = require("fs");

const coucou = () => {
	return fs.readFileSync('./views/scripts/coucou.html', 'utf8');
}

module.exports.coucou = coucou;