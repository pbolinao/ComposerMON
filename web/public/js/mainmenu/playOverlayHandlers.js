let playerName = null,
    reqPassword = false,
    // compCount = 3,
    potCount = 0,
    mPotCount = 0,
    revCount = 0,
    mRevCount = 0;

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
            revCount: revCount,
            mRevCount: mRevCount
        }
        fetch(httpServerURL + "/createRoom", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomInfo)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            joinRoom(data, true);
        }).catch(e => {
            console.log(e)
            window.alert("An error on the server has occurred. Please try creating the room again.")
        }); 

    } else {
        window.alert("The room needs a name!");
    };
};

function startGame() {
    // check if there is a player 2 first...
    // if not maybe have the person play a computer?
    // somehow check if the user is the host lol 
    // (maybe store the host name in the room lol or lock the button if they joined from main menu and not create)
    // somehow gotta get the specific player to also be pushed towards the game........
    // window.location.replace('./battle/index.html'); // USE REPLACE ON THE LIVE SITE (replace has no history)
    window.location.assign('./battle/index.html')
}

function roomBackBTN() {
    // Gotta do a thing to actually make them leave the room on the server aswell
    
    document.getElementById(serverDisplayID).style.display = "flex";
    document.getElementById(serverLabelID).style.display = "inline";
    document.getElementById(playCloseOverlayID).style.display = "inline";
    document.getElementById(roomOverlayID).style.display = "none";
}

// ------- ROOM CREATED STUFF ^^^^^

// ------- USER JOINING A ROOM 
function joinRoom(roomInfo, host) {
    // FIRST check if there is a password required and if so, then verify the password
        // JOIN THE ROOM IN THE SERVER if it's a success then do the next stuff
        // if (host) then unlock the start button, OTHERWISE lock it!! maybe even remove the event listener lmao
    let playernameText = document.getElementById('join-name').value;
    if (playernameText) {
        playerName = playernameText;
        document.getElementById(serverDisplayID).style.display = "none";
        document.getElementById(serverLabelID).style.display = "none";
        document.getElementById(playCloseOverlayID).style.display = "none";
        document.getElementById(createRoomOverlayID).style.display = "none";
        document.getElementById(roomOverlayID).style.display = "flex";

        // populate fields
        document.getElementById("play-room-name").innerHTML = roomInfo.roomName;
        document.getElementById("p1-username").innerHTML = roomInfo.host;
        document.getElementById("room-pot-count").innerHTML = roomInfo.potCount;
        document.getElementById("room-mpot-count").innerHTML = roomInfo.mPotCount;
        document.getElementById("room-rev-count").innerHTML = roomInfo.revCount;
        document.getElementById("room-mrev-count").innerHTML = roomInfo.mRevCount;
        let startGameBTN = document.getElementById("start-game-btn");

        if (host) {
            // unlock button (set on click)
            startGameBTN.addEventListener("click", startGame);
        } else {
            // lock start button
            startGameBTN.style.color = "#7a7a7a";
        }

    } else {
        window.alert("Please enter a username!");
    }
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

function composerCountSliderChange() {
    compCount = document.getElementById('composer-count-slider').value;
    document.getElementById('composer-count').innerHTML = compCount;
}

function potSliderInput() {
    potCount = document.getElementById('pot-slider').value;
    document.getElementById('pot-count').innerHTML = potCount;
}
function mPotSliderInput() {
    mPotCount = document.getElementById('mpot-slider').value;
    document.getElementById('mpot-count').innerHTML = mPotCount;
}
function revSliderInput() {
    revCount = document.getElementById('rev-slider').value;
    document.getElementById('rev-count').innerHTML = revCount;
}
function mRevSliderInput() {
    mRevCount = document.getElementById('mrev-slider').value;
    document.getElementById('mrev-count').innerHTML = mRevCount;
}
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