let db = require("../util/database");

function getTeams() {
    return db.execute("SELECT * FROM `teams`;");
};

function getTeam(team) {
    return db.execute(`SELECT * FROM \`teams\` WHERE \`ID\` = '${team}';`);
}

function makeTeam(teamID, composer1, composer1Id, composer2, composer2Id, composer3, composer3Id) {
    let insertString = `INSERT INTO teams VALUES 
                        ('${teamID}', 0, '${composer1}', ${composer1Id}, '${composer2}', ${composer2Id}, '${composer3}', ${composer3Id});`;
    return db.execute(insertString);
};

function deleteTeam(teamId) {
    let deleteString = `DELETE FROM \`teams\` WHERE \`ID\` = '${teamId}';`;
    return db.execute(deleteString);
};

function getCreatorsTeams() {
    return db.execute("SELECT * FROM `teams` WHERE Creators_Team = 1;")
}

module.exports = {
    getTeams: getTeams,
    getTeam: getTeam,
    makeTeam: makeTeam,
    deleteTeam: deleteTeam,
    getCreatorsTeams: getCreatorsTeams
};