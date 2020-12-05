const mysql = require('mysql2');
const host = "localhost";
const user = "jamespca_CMG";
const password = "To}u_i(0%]Fg";
const database = "jamespca_composermon";

// connect to a database jamespca_composermon running on the server locally
const pool = mysql.createPool({
    host: host,
    port: process.env.PORT,
    // user: user,
    user: "root",
    database: database,
    // password: password
    password: ""
});

module.exports = pool.promise();