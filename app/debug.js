var express = require('express');
var router = express.Router();
var pg = require('pg');
var db_config = process.env.DB_CONFIG;
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
router.route("/upload_bug")
    .post(parseUrlencoded, function (req, res) {
});
router.route("/see_bug_list")
    .get(function (req, res) {
});
module.exports = router;
