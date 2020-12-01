let db = require("../util/database");

function getItems() {
    return db.execute("SELECT * FROM `items`");
};

module.exports = {
    getItems: getItems
};