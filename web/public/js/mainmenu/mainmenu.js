// This file handles the main Main Menu functions
// Websocket, server handling stuff, creating elements as a response to server stuff

const httpServerURL = "https://.....";
const wsServerURL = "";

// ------ CONNECT TO THE WEBSOCKET SERVER
/*
const ws = new WebSocket('wss://INSERT SERVER URL');

ws.addEventListener("open", () => {
    console.log("Connected to server.");
    // when connected to the server we can make a get request to get the current rooms/recent matches
    // then do populate the respective things lol
});

ws.addEventListener("message", message => {
    console.log(message);
    // this can be stringified JSON
    // get the type of data it is, whether it is a recent match or a current game room
})

ws.send("this is how we would send data, we could probably stringify JSON too")
// Alternatively we send a POST/GET request and we would handle that on the server side and send it back to us

// ------ WEBSOCKET END
*/

// ------ OTHER....
window.onload = function() {
    // Establish event handlers
    establishMMHandlers();

}

function getNewRoom(roomObj) {
    // When we receive a new room from the websocket, create and add it here

    // Replace roomObj with whatever the right thing is lol
    let roomInfo = `<h4 class="roomName">${roomObj}</h4> 
                    <p class="pass-required"><i>${roomObj}</i></p>
                    <p class="roomID">Room ID: <span>${roomObj}</span></p>
                    <p class="hostName">Host: <span>${roomObj}</span></p>
                    `

    let room = document.createElement('div');
    room.classList.add('room');
    room.innerHTML = roomInfo;
    document.getElementById('server-list').prepend(room);
}