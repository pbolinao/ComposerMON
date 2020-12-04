let itemsModel = require("../models/itemsModel");

function getAllItems(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                let items = itemsModel.getItems();

                items.then( ([data, meta]) => {
                    res.status(200).json(data);
                });
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

module.exports = {
    getAllItems: getAllItems
};