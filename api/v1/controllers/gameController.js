let gameModel = require("../models/itemsModel");

function getRecentMatches(req, res) {
    let recents = gameModel.getRecentMatches()

    recents.then( ([data, meta]) => {
        res.status(200).json(data);
    });
};

module.exports = {
    getRecentMatches: getRecentMatches
};