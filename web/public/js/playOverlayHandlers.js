let playerName = null,
    roomName = null,
    reqPassword = false,
    password = null,
    compCount = 3,
    potCount = 0,
    mPotCount = 0,
    revCount = 0,
    mRevCount = 0;

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

function createRoom() {
    let roomNameText = document.getElementById('room-name-input').value;
    if (roomNameText) {
        roomName = roomNameText;
        if (reqPassword) {
            password = document.getElementById('create-password').value;
        }
        // use the count values for the https request

        // enter room
    } else {
        window.alert("The room needs a name!")
    }
}

function joinRoom() {
    // FIRST check if there is a password required and if so, then verify the password
    let playernameText = document.getElementById('join-name').value;
    if (playernameText) {
        playerName = playernameText;
        document.getElementById(serverDisplayID).style.display = "none";
        document.getElementById(serverLabelID).style.display = "none";
        document.getElementById(playCloseOverlayID).style.display = "none";
        document.getElementById(roomOverlayID).style.display = "flex";
    } else {
        window.alert("Please enter a username!");
    }
    // yikes...
}
function roomBackBTN() {
    // Gotta do a thing to actually make them leave the room on the server aswell
    document.getElementById(serverDisplayID).style.display = "flex";
    document.getElementById(serverLabelID).style.display = "inline";
    document.getElementById(playCloseOverlayID).style.display = "inline";
    document.getElementById(roomOverlayID).style.display = "none";
}

function enterRoom(roomName, playerNameEntering, roomID, enteringPlayer) {
    // enteringPlayer variable will just check if they're player 1 or 2 (whether they created it or not...)
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