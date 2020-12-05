let db = require("../util/database");

function getRecentMatches() {
    return db.execute("SELECT * FROM `recentMatches` ORDER BY `ID` DESC LIMIT 5;");
};

function getCurrentGameState(gameID) {
    return db.execute("SELECT * FROM `gameState` WHERE `gameID` = " + gameID + ";");
};

function getGameEnd(gameID) {
    return db.execute("SELECT * FROM `recentMatches` WHERE `ID` = " + gameID + ";");
}

function setGameEnd(player1, player2, winner) {
    let insertString = `INSERT INTO \`recentMatches\` (\`Player_1\`, \`Player_2\`, \`Winner\`)` +
                       `VALUES ('${player1}', '${player2}', '${winner}');`;
    return db.execute(insertString);
}

function makeTurn(gameID, p1_c1_status, p1_c2_status, p1_c3_status,
                  p2_c1_status, p2_c2_status, p2_c3_status) {
    let updateString = `UPDATE \`gameState\`` +
                       `SET \`p1_c1\` = ${p1_c1_status}, \`p1_c2\` = ${p1_c2_status}, \`p1_c3\` = ${p1_c3_status},` +
                       `\`p2_c1\` = ${p2_c1_status}, \`p2_c2\` = ${p2_c2_status}, \`p2_c3\` = ${p2_c3_status}` +
                       `WHERE \`gameID\` = ${gameID};`;
    return db.execute(updateString);
};

function createGameState(gameID, player1, player2) {
    let insertString = `INSERT INTO \`gameState\`` +
                       `(gameID, Player1, P1_C1, P1_C2, P1_C3, Player2, P2_C1, P2_C2, P2_C3)` +
                       `VALUES` +
                       `(${gameID}, '${player1}', 1, 1, 1, '${player2}', 1, 1, 1);`;
    return db.execute(insertString);
};

module.exports = {
    getRecentMatches: getRecentMatches,
    getCurrentGameState: getCurrentGameState,
    getGameEnd: getGameEnd,
    setGameEnd: setGameEnd,
    makeTurn: makeTurn,
    createGameState: createGameState
};