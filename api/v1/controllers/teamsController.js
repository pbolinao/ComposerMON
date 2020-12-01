let teamsModel = require("../models/teamsModel");

function getAllTeams(req, res) {
    let teams = teamsModel.getTeams();

    teams.then( ([data, meta]) => {
        res.status(200).json(data);
    });
};

function createTeam(req, res) {
    let body = req.body;

    let createResponse = teamsModel.makeTeam(body.composer1, body.composer1Id,
        body.composer2, body.compoer2Id, body.composer3, body.composer3Id);
    
    createResponse.then(([data, meta]) => {
        res.status(200).json(data);
    });
};

function deleteTeam(req, res) {
    let body = req.body;

    // let deleteResponse = teamsModel.
}

module.exports = {
    getAllTeams: getAllTeams,
    createTeam: createTeam,
    deleteTeam: deleteTeam
};