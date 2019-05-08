const fs = require("fs");
const headerView = require('../views/header/header');
const bodyView = require('../views/body/body');
const scripts = require('../views/scripts/scripts');
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
		const header = headerView.render();
		const body = bodyView.render();
		const coucou = scripts.coucou();
		const app = mergeValues(header + body + coucou);
		res.write(app);
}

module.exports.view = view;
module.exports.mergeValues = mergeValues;
