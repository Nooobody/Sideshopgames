"use strict";
var pg = require('pg');
var config = require('../util').db_config();
function seed_bug_db() {
    console.log("Starting to seed the error/print database.");
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("CREATE TABLE errors(\n          id SERIAL PRIMARY KEY,\n          text VARCHAR(400),\n        )", function () {
            client.end();
        });
    });
}
exports.seed_bug_db = seed_bug_db;
