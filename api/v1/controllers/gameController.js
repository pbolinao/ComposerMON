let gameModel = require("../models/gameModel");
let jwt = require('jsonwebtoken');

function getRecentMatches(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let recents = gameModel.getRecentMatches()

                recents.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function getCurrentGameState(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unautorized user'});
            } else {
                let gameState = gameModel.getCurrentGameState(req.body.gameID);

                gameState.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'})
    };
};

function getGameEnd(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let gameEnd = gameModel.getGameEnd(req.body.gameID);

                gameEnd.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function makeTurn(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let gameTurn = gameModel.makeTurn(req.body.gameID, req.body.p1_c1, req.body.p1_c2, req.body.p1_c3,
                                                  req.body.p2_c1, req.body.p2_c2, req.body.p2_c3);

                gameTurn.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
}

function createGameState(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let gameState = gameModel.createGameState(req.body.gameID, req.body.player1, req.body.player2);

                gameState.then( ([data, meta]) => {
                    res.status(201).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
}

function setGameEnd(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let gameState = gameModel.setGameEnd(req.body.player1, req.body.player2, req.body.winner);

                gameState.then( ([data, meta]) => {
                    res.status(201).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
}

module.exports = {
    getRecentMatches: getRecentMatches,
    getCurrentGameState: getCurrentGameState,
    makeTurn: makeTurn,
    createGameState: createGameState,
    getGameEnd: getGameEnd,
    setGameEnd: setGameEnd
};