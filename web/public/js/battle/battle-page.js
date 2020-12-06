// This file handles the main Battle and Composer Select functions

// const e = require("express");

// Websocket, server handling stuff, creating elements as a response to server stuff
const httpServerURL = "http://localhost:4000";
const wsServerURL = "ws://localhost:8083";

let token = localStorage.getItem('token'),
    roomID = localStorage.getItem('roomID'),
    roomInfo = JSON.parse(localStorage.getItem('roomInfo')),
    player = localStorage.getItem('player'),
    teamID = roomID + '-' + player,
    enemyTeamID,
    playerName,
    enemyName;

let composersList,
    attacksList;

let ready = false, enemyReady = false;

let turnReady = false, enemyTurnReady = false;

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
        teamID: teamID,
        enemyTeamID: enemyTeamID
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
        let composer = document.getElementById(composerID);
        document.getElementById(enemyImageIDs[pos]).src = composer.querySelector("img").src;
        document.getElementById(bsImageIDList2[pos]).src = composer.querySelector("img").src;
        document.getElementById(enemyNameIDs[pos]).innerHTML = composer.querySelector("img").alt;
        document.getElementById(bsNameIDList2[pos]).innerHTML = composer.querySelector("img").alt;
    } else if (msg == 'opponent-ready') {
        theirTeamDiv.style.animation = 'glow-hover 0.75s ease-in-out infinite alternate';
        enemyReady = true;
        readyCheck();
    } else if (indicator == 'm') {
        msg = JSON.parse(msg.substring(1));
        turnResponseHandler(msg);
    } else if (msg == 'enemy-quit') {
        endGame('quitW');
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

    fetch(httpServerURL + '/composers', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ window.localStorage.getItem('token')
        },
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        composersList = data;
    }).catch(e => {
        console.log(e)
    });

    fetch(httpServerURL + '/attacksAndBuffs', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ window.localStorage.getItem('token')
        },
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        attacksList = data;
    }).catch(e => {
        console.log(e)
    });
}

function readyCheck() {
    if (ready && enemyReady) { // START THE BATTLE!
        let csCont = document.getElementById('cs-container'),
            bsStartCont = document.getElementById('battle-start-page'),
            bsp1Cont = document.getElementById('bs-p1-container'),
            vsCont = document.getElementById('versus-div'),
            bsp2Cont = document.getElementById('bs-p2-container'),
            battleCont = document.getElementById('battle-container'),
            csFullCont = document.getElementById('composer-select-container');

        csCont.style.opacity = '0';
        setupBattlePage();
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
                                    setTimeout(() => {
                                        mainHandler('start');
                                    }, 500);
                                }, 750);
                            }, 3500);
                        }, 400);
                    }, 400);
                }, 750);
            }, 500)
        }, 900);
    }
}

function turnResponseHandler(data) {
    backToMainInfo();
    
    let firstMove = data[0];
    let secondMove = data[1];

    move(firstMove).then((res) => {
        console.log("First Move done");
        setTimeout(() => {
            move(secondMove).then((res) => {
                console.log("Second move done");
                setTimeout(() => {
                    mainHandler('default');
                }, 1000)
            });
        }, 1000);
    })
}

function move(move) {
    return new Promise((resolve, reject) => {
        let textbox = document.getElementById('player-text-info');
        if (move.meta == 'swap') {
            if (move.player == player) {
                playerSelectedIndex = move.swapVal;
                mainHandler('playerSend').then((result) => { resolve() });
            } else {
                enemySelectedIndex = move.swapVal;
                mainHandler('enemySend').then((result) => { resolve() });
            }
        } else if (move.meta == 'atk') {
            if (move.player == player) {
                if (playerAliveArray[move.current]) {
                    let dmg = move.damage;
                    let buff = move.attack.Effects_Buffs;
                    textbox.innerHTML = `${playerTeam[playerSelectedIndex].name} used ${move.attack.Name}`;
                    if (move.attack.Target_Self_Enemy == 'Self') {
                        document.getElementById('player-img').style.animation = 'shake 0.5s';
                        playerHealthHandler(buff, -1).then((result) => { 
                            document.getElementById('player-img').style.animation = '';
                            setTimeout(() => {
                                resolve() 
                            }, 500);
                        });
                    } else {
                        document.getElementById('enemy-img').style.animation = 'shake 0.5s';
                        enemyHealthHandler(dmg, 1).then((result) => { 
                            document.getElementById('enemy-img').style.animation = '';
                            setTimeout(() => {
                                resolve() 
                            }, 500);
                        });
                    }
                }
            } else {
                if (enemyAliveArray[move.current]) {
                    let dmg = move.damage;
                    let buff = move.attack.Effects_Buffs;
                    textbox.innerHTML = `${enemyName}'s ${enemyTeam[enemySelectedIndex].name} used ${move.attack.Name}`;
                    if (move.attack.Target_Self_Enemy == 'Self') {
                        document.getElementById('enemy-img').style.animation = 'shake 0.5s';
                        enemyHealthHandler(buff, -1).then((result) => { 
                            document.getElementById('enemy-img').style.animation = '';
                            setTimeout(() => {
                                resolve() 
                            }, 500);
                        });
                    } else {
                        document.getElementById('player-img').style.animation = 'shake 0.5s';
                        playerHealthHandler(dmg, 1).then((result) => { 
                            setTimeout(() => {
                                document.getElementById('player-img').style.animation = '';
                                resolve() 
                            }, 500);
                        });
                    }
                }
            }
        } else if (move.meta == 'item') {
            let potion;
            if (move.healAmount > 50) {
                potion = 'Max Potion';
            } else {
                potion = 'Potion'
            }
            if (move.player == player) {
                if (playerAliveArray[move.current]) {
                    let plus = move.healAmount;
                    textbox.innerHTML = `${playerName} used a ${potion} on ${playerTeam[playerSelectedIndex].name}`;
                    playerHealthHandler(plus, -1).then((result) => { 
                        setTimeout(() => {
                            resolve() 
                        }, 500);
                    });
                }
            } else {
                if (enemyAliveArray[move.current]) {
                    let plus = move.healAmount;
                    textbox.innerHTML = `${enemyName} used a ${potion} on ${enemyTeam[enemySelectedIndex].name}`;
                    enemyHealthHandler(plus, -1).then((result) => { 
                        setTimeout(() => {
                            resolve() 
                        }, 500);
                    });
                }
            }
        }
    });
}