const functions = require("./scripts/call.js");
const css = require("./css/style-css.js");
const style = css.rendercss;


exports.renderBody = function () {
    let form = `
        <div style="${style.body_content}">
            <p>Don't panic</p>
            <div style="${style.center_el}">
                <input type="button" value="Call" id="call"/>
            </div>
        <div>
    `;
    form += functions.callScript('call');
    return form;
}