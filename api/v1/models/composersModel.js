let db = require("../util/database");

function getComposers() {
    return db.execute("SELECT * FROM `composers`");
};

module.exports = {
    getComposers: getComposers
};