"use strict";
var pg = require('pg');
config = {
    host: ,
    port: '5432',
    user: 'postgres',
    password: 'qwer',
    database: 'sideshopgames_dev'
};
}
else {
    config = process.env.DATABASE_URL;
}
function seed_db() {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
    });
    client.query("CREATE TABLE players(\n      id SERIAL PRIMARY KEY,\n      steamid VARCHAR(30) not null,\n      name VARCHAR(40) not null,\n      exp BIGINT,\n      kills INTEGER,\n      wins INTEGER,\n      assists INTEGER,\n      deaths INTEGER,\n      total_games INTEGER,\n      buildings_built INTEGER,\n      buildings_razed INTEGER,\n      animals_killed INTEGER\n    )", function (err, result) {
        if (err) {
            console.log("Players already exist");
        }
        client.query("CREATE TABLE heroes_played(\n          player_id INTEGER PRIMARY KEY,\n          beastmaster SMALLINT,\n          gatherer SMALLINT,\n          hunter SMALLINT,\n          mage SMALLINT,\n          priest SMALLINT,\n          scout SMALLINT,\n          thief SMALLINT\n        )", function (err, result) {
            if (err) {
                console.log("Heroes played already exist");
            }
            ;
            var query = client.query("\n            CREATE TABLE player_friends(\n              player_id PRIMARY KEY\n              friend_id FOREIGN KEY\n            )", function (err, result) {
                if (err) {
                    console.log("Friends already exist");
                }
                ;
                client.end();
            });
        });
    });
}
exports.seed_db = seed_db;
