const fs = require("fs");
const _toolService = require('../../services/tool.service');

const coucou = () => {
	return fs.readFileSync('./views/scripts/coucou.html', 'utf8');
}

module.exports.coucou = coucou;