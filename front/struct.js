const bodyBuilder = require("./body.js");
const css = require("./css/style-css.js");
const imgBank = require("./img/img.js");
const style = css.rendercss;

const title = "C'est le lab";
const poster = "Loulou"
const appVersion = "0.0.1";

function renderHeader() {
    return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
          <title>${title}</title>
          <link rel="icon" type="image/png" href=${imgBank.frontImg.favicon} />
        </head>
        <body style="${style.body}">
          <div id="corps">
`;
}

function renderFooter() {
    return `
        </div>
        <footer style="${style.footer}">
        <span>Posted by: ${poster}</span>
        <span>Version : ${appVersion}</span>
        </footer></body></html>
    `;
}

const body = bodyBuilder.renderBody();

exports.renderApp = renderHeader() + body + renderFooter();