let db = require("../util/database");

function getTeams() {
    return db.execute("SELECT * FROM `teams`");
};

function makeTeam(composer1, composer1Id, composer2, composer2Id, composer3, composer3Id) {
    let insertString = `INSERT INTO \`teams\`(\`Creators_Team\`, \`Composer_1\`, \`Composer_1_ID\`, `+
                       `\`Composer_2\`, \`Composer_2_ID\`, \`Composer_3\`, \`Composer_3_ID\`) VALUES ` +
                       `(${composer1}, ${composer1Id}, ${composer2}, ${composer2Id}, ${composer3}, ${composer3Id})`;
    return db.execute(insertString);
};

function deleteTeam(teamId) {
    let deleteString = `DELETE FROM \`teams\` WHERE \`ID\` = ${teamId}`;
    return db.execute(deleteString);
};

function getCreatorsTeams() {
    return db.execute("SELECT * FROM `teams` WHERE Creators_Team = 1")
}

module.exports = {
    getTeams: getTeams,
    makeTeam: makeTeam,
    deleteTeam: deleteTeam,
    getCreatorsTeams: getCreatorsTeams
};