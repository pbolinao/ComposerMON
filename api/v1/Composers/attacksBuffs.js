const mysql = require("mysql");
const WebSocket = require("ws");
let https = require("https");
let url = require("url");
const token = "keh30sl@jsa";
let db = require("../util/database");

const wss = new WebSocket.Server( { port: 8082 } );


let server = https.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-Type": "application/json"});

    let result = db.execute("SELECT * FROM `attacksBuffs`");

    res.end(result)
});

server.listen();