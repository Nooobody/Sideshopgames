var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var db_seed = require("./db_seed");
var db_actions = require("./db_actions");
router.route("/upload")
    .post(parseUrlencoded, function (req, res) {
    var error = req.body.error;
    db_actions.insert(error);
    res.send("Error received!");
});
router.route("/list")
    .get(function (req, res) {
    db_actions.get(function (result) {
        res.send(result);
    });
});
router.route("/seed")
    .get(function (req, res) {
    db_seed.seed_bug_db();
});
module.exports = router;
