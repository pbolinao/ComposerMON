let itemsModel = require("../models/itemsModel");

function getAllItems(req, res) {
    let items = itemsModel.getItems();

    items.then( ([data, meta]) => {
        res.status(200).json(data);
    });
};

module.exports = {
    getAllItems: getAllItems
};