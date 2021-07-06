const express = require("express");
const exphbs = require("express-handlebars");
const compression = require("compression");
const process = require("process");
const path = require("path");
const router = require("./router.js");

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'static')));
app.use(router);
app.enable("case sensitive routing");
app.enable("json escape");
app.disable("x-powered-by");

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", exphbs({
    extname: ".hbs",
}));
app.set("view engine", "hbs");

// const PORT = parseInt(process.argv[2]);
const PORT = 5000;
app.listen(PORT, "localhost", console.log(`Server started on PORT: ${PORT}`));
