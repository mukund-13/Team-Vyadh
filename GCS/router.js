const express = require("express");
const router = express.Router();
const IPs = require("./IPs.js");

router.get('/', function (req, res) {
    res.render("index", { layout: false, IPs: IPs });
});

router.get('/controls', function (req, res) {
    res.render("controls", { current_page: { controls: true, cameras: false, autonomous: false, science: false }, style: "controls" });
});

router.get('/controls_old', function (req, res) {
    res.render("controls_old", { current_page: { controls: true, cameras: false, autonomous: false, science: false }, style: "controls_old" });
});

router.get("/cameras", function (req, res) {
    res.render("cameras", { current_page: { controls: false, cameras: true, autonomous: false, science: false }, style: "cameras" });
});

router.get("/autonomous", function (req, res) {
    res.render("autonomous", { current_page: { controls: false, cameras: false, autonomous: true, science: false }, style: "autonomous" });
});

router.get("/science", function (req, res) {
    res.render("science", { current_page: { controls: false, cameras: false, autonomous: false, science: true }, style: "science" });
});

module.exports = router;