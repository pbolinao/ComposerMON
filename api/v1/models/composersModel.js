let db = require("../util/database");

function getComposers() {
    return db.execute("SELECT * FROM `composers`;");
};

function getComposer(composerID) {
    return db.execute(`SELECT * FROM \`composers\` WHERE \`ID\` = '${composerID}';`)
}

module.exports = {
    getComposers: getComposers,
    getComposer: getComposer
};