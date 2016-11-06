"use strict";
var pg = require('pg');
var config = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
};
function seed_db() {
    console.log("Starting to seed the database.");
    console.log("With the following config: ");
    console.log(config);
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected to client!");
        client.query("CREATE TABLE players(\n        id SERIAL PRIMARY KEY,\n        steamid VARCHAR(30) not null,\n        name VARCHAR(40) not null,\n        exp BIGINT,\n        kills INTEGER,\n        wins INTEGER,\n        assists INTEGER,\n        deaths INTEGER,\n        total_games INTEGER,\n        buildings_built INTEGER,\n        buildings_razed INTEGER,\n        animals_killed INTEGER\n      )", function (err, result) {
            if (err) {
                console.log("Players already exist");
            }
            client.query("CREATE TABLE heroes_played(\n            player_id INTEGER PRIMARY KEY,\n            beastmaster SMALLINT,\n            gatherer SMALLINT,\n            hunter SMALLINT,\n            mage SMALLINT,\n            priest SMALLINT,\n            scout SMALLINT,\n            thief SMALLINT\n          )", function (err, result) {
                if (err) {
                    console.log("Heroes played already exist");
                }
                ;
                var query = client.query("\n              CREATE TABLE player_friends(\n                player_id PRIMARY KEY\n                friend_id FOREIGN KEY\n              )", function (err, result) {
                    if (err) {
                        console.log("Friends already exist");
                    }
                    ;
                    client.end(function (err) {
                        if (err)
                            throw err;
                        console.log("Connection has been closed.");
                    });
                });
            });
        });
    });
}
exports.seed_db = seed_db;
