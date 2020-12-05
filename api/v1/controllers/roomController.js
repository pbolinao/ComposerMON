let jwt = require('jsonwebtoken');

let currentRooms = {}

function createRoom(req, res) {
    let roomInfo = req.body;
    let roomID = Math.random().toString(36).substr(2, 4);  

    while (roomID in currentRooms) {
        roomID = Math.random().toString(36).substr(2, 4);
    }

    roomInfo['roomID'] = roomID;
    roomInfo['numPlayers'] = 1;
    currentRooms[roomID] = roomInfo;
    return roomInfo;
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
        return res.status(401).json({message: 'Unauthorized user'});
    };
};

function getCurrentRoomsNoRes() {
    return currentRooms;
}

function updateRoom(roomID, roomInfo) {
    currentRooms[roomID] = roomInfo;
}

function deleteRoomNoRes(roomID) {
    delete currentRooms[roomID];
}

module.exports = {
    getCurrentRooms: getCurrentRooms,
    getCurrentRoomsNoRes: getCurrentRoomsNoRes,
    createRoom: createRoom,
    updateRoom: updateRoom,
    deleteRoomNoRes: deleteRoomNoRes,
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
    }
}