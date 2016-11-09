var express = require('express');
var router = express.Router();
var pg = require('pg');
var db_config = process.env.DB_CONFIG;
var db = require('./database_seed');
var db_seed = db.seed_db;
var db_drop = db.drop_db;
var db_actions = require('./database_actions');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
router.route('/update_players')
    .post(parseUrlencoded, function (req, res) {
    var players = JSON.parse(req.body.players);
    console.log(players);
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        player = players_1[_i];
        db_actions.check_player_existence(player.steamid, function (result) {
            console.log(result);
        });
    }
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
