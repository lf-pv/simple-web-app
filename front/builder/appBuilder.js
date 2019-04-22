const fs = require("fs");
const bodyView = require('../views/body/body');
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

const view = (res) => {	console.log('trans : ', _translateService.translatePage('{{ text }}', null))
		const head = fs.readFileSync('./views/header.html', 'utf8');
		const body = bodyView.render();
		const scripts = fs.readFileSync('./views/scripts.html', 'utf8');
		const style = fs.readFileSync('./views/style.css.html', 'utf8');
		const app = mergeValues(head + body + scripts + style);
		res.write(app);
}

module.exports.view = view;
module.exports.mergeValues = mergeValues;
