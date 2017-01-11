"use strict";
var pg = require('pg');
var config = require('../util').db_config();
function seed_stats_db() {
    console.log("Starting to seed the error database.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("CREATE TABLE statistics(\n          id SERIAL PRIMARY KEY,\n          match_id BIGINT,\n          gametime INTEGER,\n          amount_animals INTEGER,\n          amount_items INTEGER,\n          amount_bushes INTEGER\n      )", function () {
            client.end();
        });
    });
}
exports.seed_stats_db = seed_stats_db;
