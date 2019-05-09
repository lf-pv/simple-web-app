const fs = require("fs");
// services
const _translateService = require('../services/translate.service');
const _toolService = require('../services/tool.service');

const signature = {
	'poster': 'Loulou',
	'appVersion': '0.0.2'
}

const mergeValues = (content) => {
	for (let key in signature) { // Signatures
		content = _toolService.recursiveReplace(content, key, signature[key])
	}
	return content;
}

const headerBuilder = () => {
	const h = fs.readFileSync('./views/header/header.html', 'utf8');
	return addCss(h);
}
const addCss = (header) => {
	const cssFiles = fs.readdirSync('./public/css');
	let css = '';
	cssFiles.forEach((f) => {
		css += `<link rel="stylesheet" type="text/css" href="/css/${f}" />\n`
	});
	return _toolService.includeComponent(header, '<app-css></app-css>', css);
}

const bodyBuilder = () => {
	const body = fs.readFileSync('./views/body/body.html', 'utf8');
	const sub = fs.readFileSync('./views/shared/sample.html', 'utf8');
	const footer = fs.readFileSync('./views/body/footer.html', 'utf8');
	let rep = _toolService.includeComponent(body, '<sub></sub>', sub);
	rep = _toolService.includeComponent(rep, '<footer></footer>', footer);
	return addScripts(rep);
}
const addScripts = (body) => {
	const scripts = fs.readdirSync('./public/js');
	let sc = '';
	scripts.forEach((f) => {
		sc += `<script rel="stylesheet" type="text/javascript" src="/js/${f}"></script>\n`
	});
	return _toolService.includeComponent(body, '<app-script></app-script>', sc);
}

const view = (res, language = null) => {
	const app = mergeValues(headerBuilder() + bodyBuilder());
	res.write(_translateService.translatePage(app, language));
}
module.exports = view;
