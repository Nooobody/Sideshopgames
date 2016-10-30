var express = require('express');
var router = express.Router();
var pg = require('pg');
var db_seed = require('./database_seed').seed_db;
router.route('/update_players')
    .post(function (req, res) {
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
module.exports = router;
