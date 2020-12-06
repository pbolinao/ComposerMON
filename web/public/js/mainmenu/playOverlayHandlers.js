let playerName = null,
    reqPassword = false,
    // compCount = 3,
    potCount = 0,
    mPotCount = 0;
    // revCount = 0,
    // mRevCount = 0;

// ------- ROOM CREATED STUFF
function createRoom() {
    let roomNameText = document.getElementById('room-name-input').value;
    let password = null;
    if (roomNameText) {
        if (reqPassword) {
            let pass = document.getElementById('create-password').value;
            if (pass) {
                password = pass;
            } else {
                window.alert("If a password is required, please enter a password!")
                return;
            }
        }
        // Send the room to the server
        let roomInfo = {
            roomName: roomNameText,
            host: playerName,
            password: password,
            potCount: potCount,
            mPotCount: mPotCount,
            // revCount: revCount,
            // mRevCount: mRevCount
        }
        fetch(httpServerURL + "/createRoom", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ window.localStorage.getItem('token')
            },
            body: JSON.stringify(roomInfo)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            ws.send(JSON.stringify({
                data: data,
                meta: 'create',
                room: data.roomID
            }));
            currentRooms[data.roomID] = data;
            hostCreatedJoin(data);
        }).catch(e => {
            console.log(e)
            window.alert("An error on the server has occurred. Please try creating the room again.")
        }); 

    } else {
        window.alert("The room needs a name!");
    };
};

function startGame() {
    ws.send(JSON.stringify({
        meta: 'start',
        room: currentRoomToJoin.roomID
    }));
}

// ------- ROOM CREATED STUFF ^^^^^

// ------- USER JOINING A ROOM 
let currentRoomToJoin = null;

function hostCreatedJoin(roomInfo) {
    // FIRST check if there is a password required and if so, then verify the password
        // JOIN THE ROOM IN THE SERVER if it's a success then do the next stuff
        // if (host) then unlock the start button, OTHERWISE lock it!! maybe even remove the event listener lmao
    let playernameText = document.getElementById('join-name').value;
    currentRoomToJoin = roomInfo;
    if (playernameText) {
        playerName = playernameText;
        document.getElementById(serverDisplayID).style.display = "none";
        document.getElementById(serverLabelID).style.display = "none";
        document.getElementById(playCloseOverlayID).style.display = "none";
        document.getElementById(createRoomOverlayID).style.display = "none";
        document.getElementById(roomOverlayID).style.display = "flex";

        // populate fields
        document.getElementById("play-room-name").innerHTML = roomInfo.roomName;
        let p1User = document.getElementById("p1-username")
        p1User.innerHTML = roomInfo.host;
        p1User.style.color = "#ff0000";
        document.getElementById("room-pot-count").innerHTML = roomInfo.potCount;
        document.getElementById("room-mpot-count").innerHTML = roomInfo.mPotCount;
        // document.getElementById("room-rev-count").innerHTML = roomInfo.revCount;
        // document.getElementById("room-mrev-count").innerHTML = roomInfo.mRevCount;
        let startGameBTN = document.getElementById("start-game-btn");
        startGameBTN.style.color = "#000000";
        startGameBTN.style.pointerEvents = "auto";
        startGameBTN.addEventListener("click", startGame);

    } else {
        window.alert("Please enter a username!");
    }
}

function setRoomToJoin(roomID) {
    // give it the selected class
    let selectedToClear = document.querySelectorAll('.selected-room');
    for (let i = 0; i < selectedToClear.length; i++) {
        selectedToClear[i].classList.remove('selected-room');
    }
    document.getElementById(roomID).classList.add('selected-room');
    // set currentRoomToJoin (get the room info from the server)
    console.log(currentRooms[roomID])
    console.log(roomID);
    currentRoomToJoin = currentRooms[roomID];
}

function joinRoom() {
    // check if currentRoomToJoin is null
    // check if password required from currentRoomToJoin
    if (currentRoomToJoin != null) {
        if (currentRoomToJoin.password != null) { // PASSWORD REQUIRED
            let joinPassword = document.getElementById('join-password').value;
            if (currentRoomToJoin.password != joinPassword) {
                console.log("Invalid password");
                window.alert("Invalid Password!");
                return;
            }
        }
        let playernameText = document.getElementById('join-name').value;
        if (playernameText) {
            playerName = playernameText;
            ws.send(JSON.stringify({
                meta: 'join',
                room: currentRoomToJoin.roomID,
                name: playerName
            }));
        } else {
            window.alert("Please enter a username!");
            return;
        }
    }
}

function leaveRoom() {

    ws.send(JSON.stringify({
        meta: 'leave',
        room: currentRoomToJoin.roomID
    }));

}




// --------------- Create a room handlers

function privateRoomSelect() {
    let passTextBox = document.getElementById('create-password');
    if (reqPassword) {
        reqPassword = false;
        passTextBox.style.display = 'none';
        
    } else {
        reqPassword = true;
        passTextBox.style.display = 'inline';
    }
}

// function composerCountSliderChange() {
//     compCount = document.getElementById('composer-count-slider').value;
//     document.getElementById('composer-count').innerHTML = compCount;
// }

function potSliderInput() {
    potCount = document.getElementById('pot-slider').value;
    document.getElementById('pot-count').innerHTML = potCount;
}
function mPotSliderInput() {
    mPotCount = document.getElementById('mpot-slider').value;
    document.getElementById('mpot-count').innerHTML = mPotCount;
}
// function revSliderInput() {
//     revCount = document.getElementById('rev-slider').value;
//     document.getElementById('rev-count').innerHTML = revCount;
// }
// function mRevSliderInput() {
//     mRevCount = document.getElementById('mrev-slider').value;
//     document.getElementById('mrev-count').innerHTML = mRevCount;
// }
// ----------- END CREATE ROOM HANDLERS



// ----------- OVERLAY DISPLAY HANDLERS

function openCreateRoomOverlay() {
    let playernameText = document.getElementById('join-name').value;
    if (playernameText) {
        playerName = playernameText;
        document.getElementById(serverDisplayID).style.display = "none";
        document.getElementById(serverLabelID).style.display = "none";
        document.getElementById(playCloseOverlayID).style.display = "none";
        document.getElementById(createRoomOverlayID).style.display = "flex";
    } else {
        window.alert("Please enter a username!");
    }
}

function createRoomBackBTN() {
    document.getElementById(serverDisplayID).style.display = "flex";
    document.getElementById(serverLabelID).style.display = "inline";
    document.getElementById(playCloseOverlayID).style.display = "inline";
    document.getElementById(createRoomOverlayID).style.display = "none";
}