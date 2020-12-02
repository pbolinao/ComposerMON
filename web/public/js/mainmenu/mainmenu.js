// This file handles the main Main Menu functions
// Websocket, server handling stuff, creating elements as a response to server stuff

const httpServerURL = "http://localhost:4000";
const wsServerURL = "ws://localhost:8082";

// ------ CONNECT TO THE WEBSOCKET SERVER
// /*
const ws = new WebSocket(wsServerURL);

ws.addEventListener("open", () => {
    console.log("Connected to server.");
    // when connected to the server we can make a get request to get the current rooms/recent matches
    // then populate the respective things lol
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
        getNewRoom(roomInfo)
    } else {
        // Recent matches
    }
})

// ws.send("this is how we would send data, we could probably stringify JSON too")
// Alternatively we send a POST/GET request and we would handle that on the server side and send it back to us

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
    let roomIDTEMPORARY = "no roomid yet lol"
    if (roomObj.password) {
        passRequired = "Password Required";
    }
    // Replace roomObj with whatever the right thing is lol
    let roomInfo = `<h4 class="roomName">${roomObj.roomName}</h4> 
                    <p class="pass-required"><i>${passRequired}</i></p>
                    <p class="roomID">Room ID: <span>${roomIDTEMPORARY}</span></p>
                    <p class="hostName">Host: <span>${roomObj.host}</span></p>
                    <p class="numPlayers">1/2</p>
                    `

    let room = document.createElement('div');
    room.classList.add('room');
    room.innerHTML = roomInfo;
    document.getElementById('server-list').prepend(room);
}