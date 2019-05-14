module.exports = {
	recursiveReplace: (text, key, value) => {
		return text.replace(new RegExp("{{ " + key + " }}", "g"), value);
	},
	includeComponent: (text, key, value) => {
		return text.replace(new RegExp(key, "g"), value);
	}
};
