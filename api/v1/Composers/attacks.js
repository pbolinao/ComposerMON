const mysql = require("mysql");
const WebSocket = require("ws");
let https = require("https");
let url = require("url");
const token = "keh30sl@jsa";

const wss = new WebSocket.Server( { port: 8082 } );


let server = https.createServer(function (req, res) {
    let q = url.parse(req.url, true);

    // Create connection
    let db = mysql.createConnection({
        host: "localhost",
        user: "jamespca_CMG",
        password: "CMonGame123!",
        database: "jamespca_composermon",
        multipleStatements: true
    });
});