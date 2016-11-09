"use strict";
function calculateExp(player) {
}
exports.calculateExp = calculateExp;
function db_config() {
    return {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    };
}
exports.db_config = db_config;
