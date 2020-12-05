// This file handles the main Battle and Composer Select functions
// Websocket, server handling stuff, creating elements as a response to server stuff
const httpServerURL = "http://localhost:4000";
const wsServerURL = "ws://localhost:8083";

let token = localStorage.getItem('token'),
    roomID = localStorage.getItem('roomID'),
    roomInfo = localStorage.getItem('roomInfo'),
    player = localStorage.getItem('player'),
    teamID = roomID + '-' + player,
    enemyTeamID,
    playerName,
    enemyName;

let ready = false, enemyReady = false;

if (player == 1) {
    enemyTeamID = roomID + '-' + 2;
    playerName = localStorage.getItem('p1-name');
    enemyName = localStorage.getItem('p2-name');

} else if (player == 2) {
    enemyTeamID = roomID + '-' + 1;
    playerName = localStorage.getItem('p2-name');
    enemyName = localStorage.getItem('p1-name');
}

// ------ CONNECT TO THE WEBSOCKET SERVER
const ws = new WebSocket(wsServerURL);

ws.addEventListener("open", () => {
    console.log("Connected to server.");
    let data = {
        meta: "connected",
        roomID: roomID,
        player: player,
        teamID: teamID
    }
    console.log(data);
    ws.send(JSON.stringify(data));
});

ws.addEventListener("message", message => {
    console.log(message.data);
    console.log(typeof message.data);
    let msg = message.data;
    let indicator = msg.substring(0, 1);
    
    if (indicator == 't') { // Enemy team update!
        msg = JSON.parse(msg.substring(1));
        let pos = msg.position,
            composerID = msg.composerID;
        console.log(composerID)
        let composer = document.getElementById(composerID);
        document.getElementById(enemyImageIDs[pos]).src = composer.querySelector("img").src;
        document.getElementById(bsImageIDList2[pos]).src = composer.querySelector("img").src;
        document.getElementById(enemyNameIDs[pos]).innerHTML = composer.querySelector("img").alt;
        document.getElementById(bsNameIDList2[pos]).innerHTML = composer.querySelector("img").alt;
    } else if (msg == 'opponent-ready') {
        theirTeamDiv.style.animation = 'glow-hover 0.75s ease-in-out infinite alternate';
        enemyReady = true;
        readyCheck();
    }

})

window.onload = function() {
    setupBattleUIHandlers();
    setupComposerSelect();

    let selectableComposers = document.querySelectorAll(".composer-cell");
    for (let i = 0; i < selectableComposers.length; i++) {
        let composer = selectableComposers[i],
            id = composer.id;
        composer.addEventListener("mouseover", function() {composerHover(id)});
        composer.addEventListener("mouseleave", function() {composerUnHover()});
        composer.addEventListener("click", function() {composerSelect(id)});
    }
}

function readyCheck() {
    if (ready && enemyReady) { // START THE BATTLE!
        // QUICK LOADING PAGE (like 5s) to show off the two teams before going into the battle page
        let csCont = document.getElementById('cs-container'),
            bsStartCont = document.getElementById('battle-start-page'),
            bsp1Cont = document.getElementById('bs-p1-container'),
            vsCont = document.getElementById('versus-div'),
            bsp2Cont = document.getElementById('bs-p2-container'),
            battleCont = document.getElementById('battle-container'),
            csFullCont = document.getElementById('composer-select-container');

        csCont.style.opacity = '0';
        setTimeout(() => {
            csCont.style.display = 'none';
            bsStartCont.style.display = 'flex'
            bsStartCont.style.opacity = '1';
            setTimeout(() => {
                bsp1Cont.style.transform =  "scale(1)";
                setTimeout(() => {
                    vsCont.style.transform = "scale(2)";
                    setTimeout(() => {
                        vsCont.style.transform = "scale(1)";
                        setTimeout(() => {
                            bsp2Cont.style.transform = "scale(1)";
                            setTimeout(() => {
                                bsStartCont.style.opacity = '0';
                                csFullCont.style.opacity = '0';
                                setTimeout(() => {
                                    csFullCont.style.display = 'none';
                                    battleCont.style.display = 'block';
                                    battleCont.style.opacity = '1';
                                    // run a function to start the battle lmaoo
                                }, 750);
                            }, 3500);
                        }, 400);
                    }, 400);
                }, 750);
            }, 500)
        }, 900);
    }
}
