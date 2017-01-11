"use strict";
var pg = require('pg');
var config = require('../util').db_config();
function insert(error) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("INSERT INTO errors VALUES ($1)", [error], function (err) {
            if (err)
                throw err;
            console.log("Error uploaded!");
            client.end();
        });
    });
}
exports.insert = insert;
function get(cb) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM errors", function (err, res) {
            if (err)
                throw err;
            cb(res.rows);
            client.end();
        });
    });
}
exports.get = get;
