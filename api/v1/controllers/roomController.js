let currentRooms = {}

function createRoom(req) {
    let roomInfo = req.body;

    // we receive the room name, host name, password, item counts
    // we then gotta create the room id
    // add any other info to it
    // store it in currentRooms
    
    return roomInfo;
}

function joinRoom(req, res) {
    // PUT REQUEST

    // get the room from currentRooms
    // input the user who is joining as player2
    // return the new roomInfo so that the websocket can update it
}

function deleteRoom(req, res) {
    // DELETE REQUEST
    // Call this when room is empty OR when the game is started 
}

function getCurrentRooms(req, res) {
    // GET REQUEST
}

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