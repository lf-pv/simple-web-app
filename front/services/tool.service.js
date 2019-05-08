const recursiveReplace = (text, key, value) => {
	return text.replace(new RegExp('{{ ' + key + ' }}', 'g'), value)
}

const includeComponent = (text, key, value) => {
	return text.replace(new RegExp(key, 'g'), value)
}

module.exports.recursiveReplace = recursiveReplace;
module.exports.includeComponent = includeComponent;