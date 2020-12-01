let abModel = require("../models/attacksBuffsModel");

function getAllAttacksAndBuffs(req, res) {
    let attacksAndBuffs = abModel.getAttacksAndBuffs();

    attacksAndBuffs.then( ([data, meta]) => {
        res.status(200).json(data);
    });
};

module.exports = {
    getAllAttacksAndBuffs: getAllAttacksAndBuffs
};