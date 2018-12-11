const fs = require("fs");
//service
const _translateService = require('../services/translate.service');
const _toolService = require('../services/tool.service');

const signature = {
    'poster': 'Loulou',
    'appVersion': '0.0.2'
}

function mergeValues(content, language = null) {
    content = _translateService.translatePage(content, language)
    for (let key in signature) { // Signatures
        content = _toolService.recursiveReplace(content, key, signature[key])
    }
    return content;
}

function view(res) {
    const head = fs.readFileSync('./views/header.html', 'utf8');
    const body = fs.readFileSync('./views/body.html', 'utf8');
    const scripts = fs.readFileSync('./views/scripts.html', 'utf8');
    const style = fs.readFileSync('./views/style.css.html', 'utf8');
    const app = mergeValues(head + body + scripts + style);
    res.write(app);
}

module.exports.view = view;