const fs = require("fs");
//service
const _translateService = require('../services/translate.service');
const _toolService = require('../services/tool.service');

const signature = {
		'poster': 'Loulou',
		'appVersion': '0.0.2'
}

const mergeValues = (content, language = null) => {
	content = _translateService.translatePage(content, language)
	for (let key in signature) { // Signatures
		content = _toolService.recursiveReplace(content, key, signature[key])
	}
	return content;
}

const headerBuilder = () => {
	return fs.readFileSync('./views/header/header.html', 'utf8');
}

const bodyBuilder = () => {
	const body = fs.readFileSync('./views/body/body.html', 'utf8');
	const sub = fs.readFileSync('./views/shared/sample.html', 'utf8');
	const footer = fs.readFileSync('./views/body/footer.html', 'utf8');
	const subed = _toolService.includeComponent(body, '<sub></sub>', sub);
	return _toolService.includeComponent(subed, '<footer></footer>', footer);
}

const view = (res) => {
	res.write(mergeValues(headerBuilder() + bodyBuilder()));
}
module.exports.view = view;
module.exports.mergeValues = mergeValues;
