const fs = require("fs");
// services
const _translateService = require("../services/translate.service");
const _toolService = require("../services/tool.service");

const poster = "Loulou";
const version = "0.1.0";

const addSignatures = content => {
	const signature = {
		poster,
		appVersion: version
	};
	for (let key in signature) {
		// Signatures
		content = _toolService.recursiveReplace(content, key, signature[key]);
	}
	return content;
};

const repeat = (html, param) => {
	const regex = /(<repeat #)[A-Za-z0-9]+(>)[\s\S]*?(<\/repeat>)/gm
	const keys = html.match(regex);
	keys.forEach(key => {
		let arr = [0];
		const val = key.match(/(#)[A-Za-z0-9]+(>)/gm)[0].split('#')[1].split('>')[0];
		if (Number.isInteger(Number(val))) {
			arr = Array.apply(null, { length: Number(val) }).map(Number.call, Number);
		} else if (param[val]) {
			arr = Array.apply(null, { length: param[val] }).map(Number.call, Number);
		}
		const bloc = key.split(`<repeat #${val}>`)[1].split('</repeat>')[0];
		html = _toolService.includeComponent(html, key, arr.reduce((acc, el) => `${acc}${bloc}\n`, ''));
	})
	return html;
};

const addCss = header => {
	const cssFiles = fs.readdirSync("./public/css");
	const template = '<link rel="stylesheet" type="text/css"';
	const css = cssFiles.reduce(
		(acc, el) => acc + `${template} href="/css/${el}" />\n`,
		""
	);
	return _toolService.includeComponent(header, "<css></css>", css);
};

const addScripts = body => {
	const scripts = fs.readdirSync("./public/js");
	const template = '<script type="text/javascript"';
	const sc = scripts.reduce(
		(acc, el) => acc + `${template} src="/js/${el}"></script>\n`,
		""
	);
	return _toolService.includeComponent(body, "<script></script>", sc);
};

const buildPage = (param) => {
	let app = fs.readFileSync("./views/app.html", "utf8");
	//find any balise marked as following : <app-xxx></app-xxx>
	const regex = /(<app-)[A-Za-z0-9\-]+(>)(<\/app-)[A-Za-z0-9\-]+(>)/g;
	while (app.match(regex)) {
		const keys = app.match(regex);
		const c = keys[0].split(/<app-|><\/app-|>/).find(el => el.length > 0);
		const f = fs.readFileSync(`./views/components/${c}.html`, "utf8");
		app = _toolService.includeComponent(app, keys[0], f);
	}
	app = repeat(app, param);
	app = addCss(app);
	app = addScripts(app);
	app = addSignatures(app);
	return app;
};

module.exports = (res, language = null, param = null) => {
	res.write(_translateService.translatePage(buildPage(param), language));
};;
