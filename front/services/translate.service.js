const en = require("../assets/trads/en");
const fr = require("../assets/trads/fr");
const br = require("../assets/trads/br");
const cu = require("../assets/trads/custom");
const _toolService = require("../services/tool.service");

const translate = (content, key, language) => {
	let trads;
	const defaultTrad = cu();
	switch (language) {
		case 'en':
			trads = en();
			break;
		case 'fr':
			trads = fr();
			break;
		case 'br':
			trads = br();
			break;
		default:
			trads = cu();
	}

	const trad = trads[key]
		? trads[key]
		: defaultTrad[key]
			? defaultTrad[key]
			: key;
	return (content = _toolService.recursiveReplace(content, key, trad));
};

module.exports = {
	translatePage: (page, language) => {
		const regex = /[{]+\s[A-Za-z0-9]+\s[}]+/g;
		const keys = page.match(regex).map(key => key.split(' ')[1]);
		keys.forEach(key => {
			page = translate(page, key, language);
		});
		return page;
	}
};
