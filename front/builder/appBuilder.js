const fs = require("fs");
const headerView = require('../views/header/header');
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

const view = (res) => {
		const head = headerView.render();
		const body = bodyView.render();
		const scripts = fs.readFileSync('./views/scripts.html', 'utf8');
		const style = fs.readFileSync('./views/style.css.html', 'utf8');
		const app = mergeValues(head + body + scripts + style);
		res.write(app);
}

module.exports.view = view;
module.exports.mergeValues = mergeValues;
