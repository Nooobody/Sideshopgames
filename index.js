var express = require('express');
var app = express();
var secrets = require("./config/secrets");
for (secret in secrets) {
    process.env[secret] = secrets[secret];
}
process.env.DB_CONFIG = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
};
var api = require("./app/api");
app.use("/api", api);
app.get('/', function (req, res) {
    res.send("Hello world!");
});
var port = 8080;
app.listen(port, function () {
    console.log("Listening on port " + port);
});
