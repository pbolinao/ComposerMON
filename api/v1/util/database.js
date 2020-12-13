const mysql = require('mysql2');
const host = "localhost";
const database = "jamespca_composermon";

const pool = mysql.createPool({
    host: host,
    port: process.env.PORT,
    user: "root",
    database: database,
    password: ""
});

module.exports = pool.promise();
