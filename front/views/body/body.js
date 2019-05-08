const fs = require("fs");
const _toolService = require('../../services/tool.service');

const render = () => {
	const body = fs.readFileSync('./views/body/body.html', 'utf8');
	const sub = fs.readFileSync('./views/shared/sample.html', 'utf8');
	const footer = fs.readFileSync('./views/body/footer.html', 'utf8');
	const subed = _toolService.includeComponent(body, '<sub></sub>', sub);
	return _toolService.includeComponent(subed, '<footer></footer>', footer);
}

module.exports.render = render;