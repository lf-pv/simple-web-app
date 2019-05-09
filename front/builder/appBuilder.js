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

const buildPage = () => {
  let app = fs.readFileSync("./views/app.html", "utf8");
  //find any balise marked as following : <app-xxx></app-xxx>
  const regex = /(<app-)[A-Za-z0-9\-]+(>)(<\/app-)[A-Za-z0-9\-]+(>)/g;
  while (app.match(regex)) {
    const keys = app.match(regex);
    const c = keys[0].split(/<app-|><\/app-|>/).find(el => el.length > 0);
    const f = fs.readFileSync(`./views/components/${c}.html`, "utf8");
    app = _toolService.includeComponent(app, keys[0], f);
  }
  app = addCss(app);
  app = addScripts(app);
  app = addSignatures(app);
  return app;
};

const view = (res, language = null) => {
  res.write(_translateService.translatePage(buildPage(), language));
};
module.exports = view;
