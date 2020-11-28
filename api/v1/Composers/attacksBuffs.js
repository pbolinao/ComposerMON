const mysql = require("mysql");
const WebSocket = require("ws");
let https = require("https");
let url = require("url");
const token = "keh30sl@jsa";
const host = "localhost";
const user = "jamespca_CMG";
const password = "To}u_i(0%]Fg";
const database = "jamespca_composermon";
const multipleStatements = true;

const wss = new WebSocket.Server( { port: 8082 } );


let server = https.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, {"Content-Type": "application/json"});


    // Create connection
    let db = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        multipleStatements: multipleStatements
    });

    db.query("SELECT * FROM `attacksBuffs`", function (err, result, fields) {
        if (err) {
            console.log("Error connecting to database: ", err);
        }
        console.log(result);
        console.log(JSON.stringify(result));
        res.end(result);
    })
});

server.listen();