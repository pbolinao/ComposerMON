let teamsModel = require("../models/teamsModel");
let jwt = require('jsonwebtoken');

function getAllTeams(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let teams = teamsModel.getTeams();
                teams.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function createTeam(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let body = req.body;

                let createResponse = teamsModel.makeTeam(
                    body.teamID, 
                    body.composer1, body.composer1Id,
                    body.composer2, body.composer2Id,
                    body.composer3, body.composer3Id
                );
                
                createResponse.then(([data, meta]) => {
                    res.status(201).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function deleteTeam(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let body = req.body;

                let deleteResponse = teamsModel.deleteTeam(body.teamId);
                deleteResponse.then(([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function getCreatorsTeams() {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let teams = teamsModel.getCreatorsTeams();
                teams.then(([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
    
};

module.exports = {
    getAllTeams: getAllTeams,
    createTeam: createTeam,
    deleteTeam: deleteTeam,
    getCreatorsTeams: getCreatorsTeams
};