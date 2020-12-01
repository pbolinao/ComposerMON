let composersModel = require("../models/composersModel");

function getAllComposers(req, res) {
    let composers = composersModel.getComposers();

    composers.then( ([data, meta])=> {
        res.status(200).json(data);
    });
};

module.exports = {
    getAllComposers: getAllComposers
};