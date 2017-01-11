var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var db_seed = require("./db_seed");
var db_actions = require("./db_actions");
router.route("/upload")
    .post(parseUrlencoded, function (req, res) {
    var data = JSON.parse(req.query.data);
    db_actions.upload(data);
    res.send("Data uploaded!");
});
router.route("/seed")
    .get(function (req, res) {
    db_seed.seed_stats_db();
});
module.exports = router;
