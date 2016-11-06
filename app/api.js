var express = require('express');
var router = express.Router();
var pg = require('pg');
var db = require('./database_seed');
var db_seed = db.seed_db;
var db_drop = db.drop_db;
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
router.route('/update_players')
    .post(parseUrlencoded, function (req, res) {
    console.log(req.body);
    res.send("Update succesful!");
});
router.route('/get_players')
    .get(function (req, res) {
    console.log(req.query);
    res.send("Hello from API!");
});
router.route('/get_leaderboard')
    .get(function (req, res) {
});
router.route('/database_seed')
    .get(function (req, res) {
    db_seed();
    res.send("Database has been seeded");
});
router.route('/database_drop')
    .get(function (req, res) {
    db_drop();
    res.send("Database has been dropped!");
});
module.exports = router;
