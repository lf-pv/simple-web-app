var fs = require("fs");
const values = require('../assets/values');
const imageURL = require('../assets/img');

function mergeValues(content) {
    const datas = values.getValues();
    const imgs = imageURL.getImagesURL()
    for (var key in datas) { // Text datas
        content = content.replace("{{" + key + "}}", datas[key])
    }
    for (var img in imgs) { // Images
        content = content.replace("{{" + img + "}}", imgs[img])
    }
    return content;
}

function view(res) {
    const head = fs.readFileSync('./views/header.html', 'utf8');
    const body = fs.readFileSync('./views/body.html', 'utf8');
    const app = mergeValues(head + body);
    res.write(app);
}

module.exports.view = view;