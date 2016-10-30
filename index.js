var express = require('express');
var app = express();
var api = require("./app/api");
app.use("/api", api);
app.get('/', function (req, res) {
    res.send("Hello world!");
});
var port = 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});
