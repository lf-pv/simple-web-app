const en = require("../assets/trads/en");
const fr = require("../assets/trads/fr");
const df = require("../assets/trads/default");
const _toolService = require("../services/tool.service");

const translate = (content, key, language) => {
	let trads;
	const defaultTrad = df();
	switch (language) {
		case "en":
			trads = en();
			break;
		case "fr":
			trads = fr();
			break;
		default:
			trads = df();
	}

	const trad = trads[key]
		? trads[key]
		: defaultTrad[key]
			? defaultTrad[key]
			: key;
	return (content = _toolService.recursiveReplace(content, key, trad));
};

const translatePage = (page, language) => {
	const regex = /[{]+\s[A-Za-z0-9]+\s[}]+/g;
	const keys = page.match(regex).map(key => key.split(" ")[1]);
	keys.forEach(key => {
		page = translate(page, key, language);
	});
	return page;
};

module.exports = { translatePage };
