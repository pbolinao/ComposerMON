let db = require("../util/database");

function getRecentMatches() {
    return db.execute("SELECT * FROM `recentMatches` ORDER BY `ID` DESC LIMIT 5");
};

module.exports = {
    getRecentMatches: getRecentMatches
};