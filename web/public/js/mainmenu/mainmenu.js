// This file handles the main Main Menu functions
// Websocket, server handling stuff, creating elements as a response to server stuff

const httpServerURL = "http://localhost:4000";
const wsServerURL = "ws://localhost:8082";

// ------ CONNECT TO THE WEBSOCKET SERVER
// /*
const ws = new WebSocket(wsServerURL);

let currentRooms = {}

ws.addEventListener("open", () => {
    console.log("Connected to server.");
    // when connected to the server we can make a get request to get the current rooms/recent matches
    fetch(httpServerURL + "/getRooms")
    .then(response => response.json())
        .then(data => {
            console.log(data);
            currentRooms = data;
            for (const roomID in currentRooms) {
                getNewRoom(currentRooms[roomID]);
            }
        }).catch(e => {
            console.log(e)
        }); 
});

ws.addEventListener("message", message => {
    console.log(message.data);
    console.log(typeof message.data);
    let msg = message.data;
    let indicator = msg.substring(0, 1);
    if (indicator == '1') {
        // Create Room!
        msg = msg.substring(1);
        roomInfo = JSON.parse(msg);
        currentRooms[roomInfo.roomID] = roomInfo;
        getNewRoom(roomInfo)
    } else if (indicator == '2') { // Player joined room, update player 2 text
        // this is also how i can display the overlay for the joining player!!!!
    }else {
        // Recent matches
    }
})

// ------ WEBSOCKET END
// */

// ------ OTHER....
window.onload = function() {
    // Establish event handlers
    establishMMHandlers();
}

function getNewRoom(roomObj) {
    // When we receive a new room from the websocket, create and add it here
    let passRequired = "";
    if (roomObj.password) {
        passRequired = "Password Required";
    }

    // Replace roomObj with whatever the right thing is lol
    let roomInfo = `<h4 class="roomName">${roomObj.roomName}</h4> 
                    <p class="pass-required"><i>${passRequired}</i></p>
                    <p class="roomID">Room ID: <span hidden>${roomObj.roomID}</span></p>
                    <p class="hostName">Host: <span>${roomObj.host}</span></p>
                    <p class="numPlayers"><span id="${roomObj.roomID}-numP">${roomObj.numPlayers}</span>/2</p>`

    let room = document.createElement('div');
    room.classList.add('room');
    room.id = roomObj.roomID;
    room.innerHTML = roomInfo;
    room.addEventListener("click", function() {
        setRoomToJoin(roomObj.roomID);
    })
    document.getElementById('server-list').prepend(room);
}