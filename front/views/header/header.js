const fs = require("fs");
const _toolService = require('../../services/tool.service');

const render = () => {
	const body = fs.readFileSync('./views/body/body.html', 'utf8');
	const sub = fs.readFileSync('./views/shared/sample.html', 'utf8');
	return _toolService.includeComponent(body, '<sub></sub>', sub);
}

module.exports.render = render;