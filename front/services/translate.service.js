const en = require('../assets/trads/en');
const fr = require('../assets/trads/fr');
const df = require('../assets/trads/default');
const _toolService = require('../services/tool.service');

function translate(content, key, language) {
    let trads;
    const defaultTrad = df.getValues();
    switch (language) {
        case 'en':
            trads = en.getValues();
            break;
        case 'fr':
            trads = fr.getValues();
            break;
        default:
            trads = df;
    }
    const trad = trads[key] ? trads[key] : defaultTrad[key];
    return content = _toolService.recursiveReplace(content, key, trad)
}

module.exports.translate = translate;