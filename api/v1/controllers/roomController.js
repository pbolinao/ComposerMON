let jwt = require('jsonwebtoken');

let currentRooms = {}

function createRoom(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'})
            } else {
                let roomInfo = req.body;
                let roomID = Math.random().toString(36).substr(2, 4);  

                while (roomID in currentRooms) {
                    roomID = Math.random().toString(36).substr(2, 4);
                }

                roomInfo['roomID'] = roomID;
                roomInfo['numPlayers'] = 1;
                currentRooms[roomID] = roomInfo;

                // add any other info to it
                // store it in currentRooms
                // return res.status(200).json(roomInfo);
                return roomInfo;
            };
        });
    } else {
        let roomInfo = req.body;
        let roomID = Math.random().toString(36).substr(2, 4);  

        while (roomID in currentRooms) {
            roomID = Math.random().toString(36).substr(2, 4);
        }

        roomInfo['roomID'] = roomID;
        roomInfo['numPlayers'] = 1;
        currentRooms[roomID] = roomInfo;
        return roomInfo;
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function joinRoom(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                // PUT REQUEST

                // get the room from currentRooms
                // input the user who is joining as player2
                // return the new roomInfo so that the websocket can update it
                return res.status(200).json({message: 'Joined room'});
            }
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function deleteRoom(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                // DELETE REQUEST
                // Call this when room is empty OR when the game is started 
                return res.status(200).json({message: 'Deleted room'});
            }
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function getCurrentRooms(req, res) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'});
            } else {
                res.status(200).send(JSON.stringify(currentRooms));
            }
        });
    } else {
        return res.status(200).send(JSON.stringify(currentRooms));
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

module.exports = {
    getCurrentRooms: getCurrentRooms,
    createRoom: createRoom,
    joinRoom: joinRoom,
    beforeEnter(el) {
        console.log('beforeEnter');
    },
    enter(el, done) {
        console.log('enter');
        done();
    },
    beforeLeave(el) {
        console.log('beforeLeave');
    },
    leave(el, done) {
        console.log('leave');
        done();
    },
    deleteRoom: deleteRoom
}