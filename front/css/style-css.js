const imgBank = require("../img/img.js");

exports.rendercss = {
    body: `
        background-image : url(${imgBank.frontImg.background});
        background-repeat: no-repeat;
        background-size: cover;
        box-sizing: border-box;
        height: 100vh;
        margin: 0;
        display: flex;
        flex-direction: column;
    `,

    footer: `
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 10px;
        right: 10px;
    `,
    center_el: `
        display: flex;
        flex-direction: row;
        justify-content: center;
    `,
    body_content: `
        margin-left: 10px;
    `
}