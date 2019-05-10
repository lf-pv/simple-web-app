const express = require("express");
const chalk = require("chalk");
const path = require("path");

const env = require("./env/local");
const builder = require("./builder/appBuilder");

const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(
	"/css",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use("/js", express.static(path.join(__dirname, "node_modules/ajax/dist")));
app.use(
	"/js",
	express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(
	"/js",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.get("/:language", (req, res) => {
	try {
		const lg = req.params.language;
		res.writeHead(200, { "Content-Type": "text/html" });
		builder(res, lg);
		res.end();
	} catch (e) {
		console.log(chalk.red(e));
	}
});

app.listen(env.front, "0.0.0.0", () => {
	console.log(`listening (${chalk.blue(env.front)}) ...`);
});
