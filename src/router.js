const express = require("express");

const FormatRes = require('./shared/format-res');

const _ = require('lodash');

const router = express.Router();

router.get("/hello", (req, res) => {
    const retRes = new FormatRes(
        true, "", "Hi, Duddy! I am alive!").to_json();
    res.send(retRes);
});

router.get("/", (req, res) => {
    res.render('simulate_api.html');
});

router.use("/", require('./simulate_api/router'));

module.exports = router;