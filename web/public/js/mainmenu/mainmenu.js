// This file handles the main Main Menu functions
// Websocket, server handling stuff, creating elements as a response to server stuff

const httpServerURL = "http://localhost:4000";
const wsServerURL = "ws://localhost:8082";

// ------ CONNECT TO THE WEBSOCKET SERVER
const ws = new WebSocket(wsServerURL);

let currentRooms = {}
localStorage.setItem('player', 0); // used for checking which player this is (1: host, 2: other)

ws.addEventListener("open", () => {
    console.log("Connected to server.");

    fetch(httpServerURL + '/getToken', { // get the token
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).
    then(res => {
        if(res.status == 200) {
            return res.json();
        }
        throw new Error('Invalid credentials');
    })
    .then(data => {
        token = data.token;
        localStorage.setItem('token', data.token);

        // when connected to the server we can make a get request to get the current rooms/recent matches
        fetch(httpServerURL + "/getRooms", {
            headers: {
                'authorization': 'JWT '+ window.localStorage.getItem('token')
            }
        })
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
    }).
    catch(e => alert(e));
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
        getNewRoom(roomInfo);
    } else if (msg == 'room-created') {
        localStorage.setItem('player', 1);
    } else if (indicator == '2') { // Player joined room, update text
        msg = msg.substring(1);
        console.log(msg);
        roomInfo = JSON.parse(msg);
        joinRoomOverlay(roomInfo);
        if (localStorage.getItem('player') == 0) {
            localStorage.setItem('player', 2);
        }
        document.getElementById(roomInfo.roomID + "-numP").innerHTML = roomInfo.numPlayers;
    } else if (indicator == 'z') { // Player joined a room, update that specific room div
        msg = msg.substring(1);
        console.log(msg);
        roomInfo = JSON.parse(msg);
        currentRooms[roomInfo.roomID] = roomInfo;
        document.getElementById(roomInfo.roomID + "-numP").innerHTML = roomInfo.numPlayers;
    } else if (msg == 'Sorry, but this room is full!') {
        window.alert(msg);
    } else if (indicator == '3') { // Other player left, update the name
        msg = msg.substring(1); 
        console.log(msg);
        roomInfo = JSON.parse(msg);
        let p2User = document.getElementById("p2-username");
        p2User.innerHTML = 'Player 2';
        p2User.style.color = "#000000";
        document.getElementById(roomInfo.roomID + "-numP").innerHTML = roomInfo.numPlayers;
    } else if (indicator == '4') { // Player left, close the overlay
        localStorage.setItem('player', 0);
        leaveRoomOverlay();
    } else if (indicator == 'x') { // Remove the room
        msg = msg.substring(1); 
        console.log(msg);
        roomInfo = JSON.parse(msg);
        delete currentRooms[roomInfo.roomID];
        document.getElementById(roomInfo.roomID).remove();
    } else if (indicator == '+') { // Start game!
        msg = msg.substring(1); 
        console.log(msg);
        roomInfo = JSON.parse(msg);
        localStorage.setItem('roomID', roomInfo.roomID);
        localStorage.setItem('roomInfo', roomInfo);
        window.location.assign('./battle/index.html');
    } else if (indicator == '-') {
        // not enough players
        window.alert("You have no opponent!");
    } else {
        // Recent matches
    }
})

// ------ WEBSOCKET END

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

function joinRoomOverlay(roomInfo) {
    
    document.getElementById(serverDisplayID).style.display = "none";
    document.getElementById(serverLabelID).style.display = "none";
    document.getElementById(playCloseOverlayID).style.display = "none";
    document.getElementById(createRoomOverlayID).style.display = "none";
    document.getElementById(roomOverlayID).style.display = "flex";

    // populate fields
    document.getElementById("play-room-name").innerHTML = roomInfo.roomName;
    let p1User = document.getElementById("p1-username"),
        p2User = document.getElementById("p2-username");
    p1User.innerHTML = roomInfo.host;
    p1User.style.color = "#ff0000";
    p2User.innerHTML = roomInfo.player2;
    p2User.style.color = "#0000ff";
    document.getElementById("room-pot-count").innerHTML = roomInfo.potCount;
    document.getElementById("room-mpot-count").innerHTML = roomInfo.mPotCount;
    document.getElementById("room-rev-count").innerHTML = roomInfo.revCount;
    document.getElementById("room-mrev-count").innerHTML = roomInfo.mRevCount;
}

function leaveRoomOverlay() {

    document.getElementById("play-room-name").innerHTML = '';
    let p1User = document.getElementById("p1-username"),
        p2User = document.getElementById("p2-username");
    p1User.innerHTML = 'Player 1';
    p1User.style.color = "#000000";
    p2User.innerHTML = 'Player 2';
    p2User.style.color = "#000000";
    document.getElementById("room-pot-count").innerHTML = '';
    document.getElementById("room-mpot-count").innerHTML = '';
    document.getElementById("room-rev-count").innerHTML = '';
    document.getElementById("room-mrev-count").innerHTML = '';

    document.getElementById(serverDisplayID).style.display = "flex";
    document.getElementById(serverLabelID).style.display = "inline";
    document.getElementById(playCloseOverlayID).style.display = "inline";
    document.getElementById(roomOverlayID).style.display = "none";
}