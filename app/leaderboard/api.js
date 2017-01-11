var express = require('express');
var router = express.Router();
var db = require('./database_seed');
var db_seed = db.seed_db;
var db_drop = db.drop_db;
var db_actions = require('./database_actions');
var util = require('../util');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
router.route('/update_players')
    .post(parseUrlencoded, function (req, res) {
    var players = JSON.parse(req.body.players);
    console.log(players);
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        player = players_1[_i];
        if (!player.nick) {
            player.nick = "";
        }
        db_actions.check_player_existence(player.steamid, function (result) {
            if (result.length == 0) {
                player.exp = util.calculateExp(player);
                player.wins = player.is_winner ? 1 : 0;
                player.animals_killed = !player.animals_killed ? 0 : parseInt(player.animals_killed);
                player.buildings_built = !player.buildings_built ? 0 : parseInt(player.buildings_built);
                player.buildings_razed = !player.buildings_razed ? 0 : parseInt(player.buildings_razed);
                db_actions.insert_new_player(player);
            }
            else {
                var row = result[0];
                row.kills += parseInt(player.kills);
                row.assists += parseInt(player.assists);
                row.deaths += parseInt(player.deaths);
                if (player.animals_killed) {
                    row.animals_killed += parseInt(player.animals_killed);
                }
                if (player.buildings_built) {
                    row.buildings_built += parseInt(player.buildings_built);
                }
                if (player.buildings_razed) {
                    row.buildings_razed += parseInt(player.buildings_razed);
                }
                row.exp += util.calculateExp(player);
                row.total_games += 1;
                if (player.is_winner) {
                    row.wins += 1;
                }
                row.name = player.name;
                row.nick = player.nick;
                db_actions.update_player(row);
            }
        });
    }
    res.send("Update succesful!");
});
router.route('/get_players')
    .get(function (req, res) {
    var players = JSON.parse(req.query.players);
    db_actions.get_players(players, function (result) {
        res.send(result);
    });
});
router.route('/get_leaderboard')
    .get(function (req, res) {
    db_actions.get_leaderboard(function (result) {
        res.send(result);
    });
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
