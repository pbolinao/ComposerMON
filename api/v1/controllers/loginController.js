let jwt = require('jsonwebtoken');

function authUser(req, res) {
    res.status(200).json({token:
        jwt.sign({
            username: "JWT_Example",
            password: "JWT_Password",
            id: "JWT_ID"
        }, "DSAFFA$W#FA$F%@143fWEf3f")
    });
};

module.exports = {
    authUser: authUser
};