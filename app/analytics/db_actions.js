"use strict";
var pg = require('pg');
var config = require('../util').db_config();
function upload(data) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("INSERT INTO statistics VALUES ($1, $2, $3, $4, $5)", [
            parseInt(data.match_id),
            parseInt(data.gametime),
            parseInt(data.amount_animals),
            parseInt(data.amount_items),
            parseInt(data.amount_bushes)
        ], function (err) {
            if (err)
                throw err;
            console.log("Data uploaded!");
            client.end();
        });
    });
}
exports.upload = upload;
