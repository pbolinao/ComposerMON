let db = require("../util/database");

function getAttacksAndBuffs() {
    return db.execute("SELECT * FROM `attacksBuffs`;");
};

module.exports = {
    getAttacksAndBuffs: getAttacksAndBuffs
};