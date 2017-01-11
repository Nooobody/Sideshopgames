"use strict";
var pg = require('pg');
var config = require('./util').db_config();
function check_player_existence(steamid, callback) {
    console.log("Checking player's existence.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM players WHERE steamid = $1", [steamid], function (err, result) {
            if (err)
                throw err;
            if (callback)
                callback(result.rows);
            client.end();
        });
    });
}
exports.check_player_existence = check_player_existence;
function get_players(players, callback) {
    console.log("Fetching players.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM players WHERE steamid IN ($1)", [players.join(",")], function (err, result) {
            if (err)
                throw err;
            if (callback)
                callback(result.rows);
            client.end();
        });
    });
}
exports.get_players = get_players;
function get_leaderboard(callback) {
    console.log("Fetching leaderboard.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM players ORDER BY exp DESC LIMIT 50", function (err, result) {
            if (err)
                throw err;
            if (callback)
                callback(result.rows);
            client.end();
        });
    });
}
exports.get_leaderboard = get_leaderboard;
function insert_new_player(player) {
    console.log("Inserting a new player.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("\n      INSERT INTO players\n        (steamid, name, nick, exp, kills, wins, assists, deaths, total_games, buildings_built, buildings_razed, animals_killed)\n      VALUES\n        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\n        ", [
            player.steamid,
            player.name,
            player.nick,
            player.exp,
            parseInt(player.kills),
            parseInt(player.wins),
            parseInt(player.assists),
            parseInt(player.deaths),
            1,
            player.buildings_built,
            player.buildings_razed,
            player.animals_killed
        ], function (err) {
            if (err)
                throw err;
            client.end();
        });
    });
}
exports.insert_new_player = insert_new_player;
function update_player(player) {
    console.log("Updating a player.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("UPDATE players SET name=$2,nick=$3,exp=$4,kills=$5,wins=$6,assists=$7,deaths=$8,total_Games=$9,buildings_built=$10,buildings_razed=$11,animals_killed=$12  WHERE steamid = $1", [
            player.steamid,
            player.name,
            player.nick,
            player.exp,
            player.kills,
            player.wins,
            player.assists,
            player.deaths,
            player.total_games,
            player.buildings_built,
            player.buildings_razed,
            player.animals_killed
        ], function (err) {
            if (err)
                throw err;
            client.end();
        });
    });
}
exports.update_player = update_player;
