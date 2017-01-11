"use strict";
function calculateExp(player) {
    var xp = player.kills * 0.5 + player.level / 3;
    var minutes = player.game_time / 60;
    if (player.is_winner) {
        xp += 15 + minutes / 3;
    }
    else {
        xp += 5 + minutes / 3;
    }
    return Math.round(xp);
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
