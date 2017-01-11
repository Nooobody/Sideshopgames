var express = require('express');
var app = express();
var secrets = require("./config/secrets");
for (secret in secrets) {
    process.env[secret] = secrets[secret];
}
var api = require("./app/leaderboard/api");
app.use("/api", api);
var debug = require("./app/debug/debug");
app.use("/debug", debug);
var analytics = require("./app/analytics/analytics");
app.use("/analytics", analytics);
app.get('/', function (req, res) {
    res.send("Hello world!");
});
var port = 8080;
app.listen(port, function () {
    console.log("Listening on port " + port);
});
