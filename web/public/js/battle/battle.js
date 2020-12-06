// GAME VARIABLES

// const { resolve } = require("path");

let playerSelectedIndex = 0,
    enemySelectedIndex = 0,
    playerAliveArray = [true, true, true],
    enemyAliveArray = [true, true, true],
    playerTeam = [],
    playerHPArr = [100, 100, 100];
    playerAttackArr = [],
    enemyTeam = [],
    enemyHPArr = [100, 100, 100];
    enemyAttackArr = []; 

// BAG VARIABLES
let potCount = 0,
    potCountDiv,
    mPotCount = 0,
    mPotCountDiv;
    // revCount = 0,
    // revCountDiv,
    // mRevCount = 0,
    // mRevCountDiv;

function setupBattlePage() {
    // this function will run as soon as the game starts
    console.log(roomInfo);
    potCount = roomInfo.potCount;
    mPotCount = roomInfo.mPotCount;
    // revCount = roomInfo.revCount;
    // mRevCount = roomInfo.mRevCount;
    potCountDiv = document.getElementById('potCount');
    mPotCountDiv = document.getElementById('mpotCount');
    // revCountDiv = document.getElementById('revCount');
    // mRevCountDiv = document.getElementById('mrevCount');
    potCountDiv.innerHTML = potCount;
    mPotCountDiv.innerHTML = mPotCount;
    // revCountDiv.innerHTML = revCount;
    // mRevCountDiv.innerHTML = mRevCount;

    document.getElementById('attack1').addEventListener('click', function() { moveHandler('atk', 0) });
    document.getElementById('attack2').addEventListener('click', function() { moveHandler('atk', 1) });
    document.getElementById('attack3').addEventListener('click', function() { moveHandler('atk', 2) });
    document.getElementById('attack4').addEventListener('click', function() { moveHandler('atk', 3) });

    document.getElementById('pot-btn').addEventListener('click', function() { moveHandler('item', 1) });
    document.getElementById('mpot-btn').addEventListener('click', function() { moveHandler('item', 2) });
    
    document.getElementById('composer1').addEventListener('click', function() { moveHandler('swap', 0) });
    document.getElementById('composer2').addEventListener('click', function() { moveHandler('swap', 1) });
    document.getElementById('composer3').addEventListener('click', function() { moveHandler('swap', 2) });

    // GET ENEMY
    fetch(httpServerURL + '/getTeam/' + enemyTeamID, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'JWT '+ window.localStorage.getItem('token')
        },
    }).then(response => response.json())
    .then(data => {
        data = data[0];
        console.log(data);
        enemyTeam = [
            {id: data.Composer_1_ID, name: data.Composer_1},
            {id: data.Composer_2_ID, name: data.Composer_2},
            {id: data.Composer_3_ID, name: data.Composer_3}
        ]
        for (let i = 0; i < 3; i++) {
            let enemy = composersList[enemyTeam[i].id - 1],
                player = composersList[playerTeam[i].id - 1];
            enemyTeam[i]['info'] = enemy;
            playerTeam[i]['info'] = player;
            let image1 = new Image;
            let image2 = new Image;
            image1.src = enemy.Image;
            image2.src = player.Image;
        }
        document.getElementById('composer1').innerHTML = playerTeam[0].name;
        document.getElementById('composer2').innerHTML = playerTeam[1].name;
        document.getElementById('composer3').innerHTML = playerTeam[2].name;
    }).catch(e => {
        console.log(e)
    });
}

function setPlayerComposerMON(i) {
    console.log(i)
    console.log(playerTeam);
    let name = playerTeam[i].name;
    let info = playerTeam[i].info;
    playerAttackArr = info.Attack_IDs_Array.split(', ');

    document.getElementById('b-player-hp').value = playerHPArr[i];
    document.getElementById('b-player-composermon').innerHTML = name;

    document.getElementById('attack1').innerHTML = attacksList[playerAttackArr[0] - 1].Name;
    document.getElementById('attack2').innerHTML = attacksList[playerAttackArr[1] - 1].Name;
    document.getElementById('attack3').innerHTML = attacksList[playerAttackArr[2] - 1].Name;
    document.getElementById('attack4').innerHTML = attacksList[playerAttackArr[3] - 1].Name;
    for (let j = 1; j < 4; j++) {
        let c = document.getElementById('composer' + j);
        if (j == (i + 1)) {
            c.style.color = "#616161";
            c.style.pointerEvents = "none";
        } else {
            c.style.color = "#000000";
            c.style.pointerEvents = "all";
        }
    }
    document.getElementById('player-img').src = info.Image;
    let hpbar = document.getElementById('b-player-hp');
    hpbar.value = playerHPArr[i];
}

function setEnemyComposerMON(i) {
    let name = enemyTeam[i].name;
    let info = enemyTeam[i].info;
    enemyAttackArr = info.Attack_IDs_Array;

    document.getElementById('b-enemy-hp').value = enemyHPArr[i];
    document.getElementById('b-enemy-composermon').innerHTML = name;
    document.getElementById('enemy-img').src = info.Image;
    let hpbar = document.getElementById('b-enemy-hp');
    hpbar.value = enemyHPArr[i];
}

function mainHandler(meta) {
    let textbox = document.getElementById('player-text-info');
    return new Promise((resolve, reject) => {
        if (meta == 'start') {
            textbox.innerHTML = `You are challenged by trainer ${enemyName}!`;
            setTimeout(() => {
                mainHandler('enemySend').then((res) => {
                    mainHandler('playerSend').then((res) => {
                        mainHandler('default');
                        resolve();
                    })
                })
            }, 1000);
        } else if (meta == 'enemySend') {
            setEnemyComposerMON(enemySelectedIndex);
            textbox.innerHTML = `${enemyName} sent out ${enemyTeam[enemySelectedIndex].name}`;
            setTimeout(() => {
                resolve();
            }, 1000);
        } else if (meta == 'playerSend') {
            setPlayerComposerMON(playerSelectedIndex);
            textbox.innerHTML = `${playerName} sent out ${playerTeam[playerSelectedIndex].name}`;
            setTimeout(() => {
                resolve();
            }, 1000);
        } else if (meta == 'enemyFaint') {
            textbox.innerHTML = `${enemyName}'s ${enemyTeam[enemySelectedIndex].name} fainted!`;
            setTimeout(() => {
                resolve();
            }, 1000);
        } else if (meta == 'playerFaint') {
            textbox.innerHTML = `${playerName}'s ${playerTeam[playerSelectedIndex].name} fainted!`;
            setTimeout(() => {
                resolve();
            }, 1000);
        } else if (meta == 'default') {
            textbox.innerHTML = `What will ${playerTeam[playerSelectedIndex].name} do?`;
            document.getElementById('player-right-cont').style.pointerEvents = 'all';
            resolve();
        }
    });
}

function moveHandler(type, i) {
    backToMainInfo();
    document.getElementById('player-text-info').innerHTML = "Waiting...";
    document.getElementById('player-right-cont').style.pointerEvents = 'none';
    if (type == 'atk') {
        let atk = attacksList[playerAttackArr[i] - 1];
        
        ws.send(JSON.stringify({
            meta: type,
            roomID: roomID,
            player: player,
            atk: atk,
            current: playerSelectedIndex
        }));
    } else if (type == 'item') {
        if (i == 1) {
            if (potCount > 0) {
                potCount--;
                document.getElementById('potCount').innerHTML = potCount;
                ws.send(JSON.stringify({
                    meta: type,
                    roomID: roomID,
                    player: player,
                    itemID: i,
                    current: playerSelectedIndex
                }));
            } else {
                window.alert("No more potions!")
                document.getElementById('pot-btn').style.color = '#616161';
                document.getElementById('pot-btn').style.pointerEvents = "none";
            }
        } else if (i == 2) {
            if (mPotCount > 0) {
                mPotCount--;
                document.getElementById('mpotCount').innerHTML = mPotCount;
                ws.send(JSON.stringify({
                    meta: type,
                    roomID: roomID,
                    player: player,
                    itemID: i,
                    current: playerSelectedIndex
                }));
            } else {
                window.alert("No more max potions!")
                document.getElementById('mpot-btn').style.color = '#616161';
                document.getElementById('mpot-btn').style.pointerEvents = "none";
            }
        }
    } else if (type == 'swap') {
        ws.send(JSON.stringify({
            meta: type,
            roomID: roomID,
            player: player,
            swap: i,
            current: playerSelectedIndex
        }));
    }

    // set the textbox visuals
}

function playerHealthHandler(dmg, mult) {
    return new Promise((resolve, reject) => {
        let hpbar = document.getElementById('b-player-hp');
        playerHPArr[playerSelectedIndex] = playerHPArr[playerSelectedIndex] - (dmg * mult);
        let fainted = false;
        for (let i = 0; i < dmg; i++) {
            setTimeout(() => {
                if (hpbar.value <= 100 && hpbar.value > 0) {
                    if (mult == -1) {
                        hpbar.value = hpbar.value + 1;
                    } else {
                        hpbar.value = hpbar.value - 2;
                    }
                    if (hpbar.value <= 0 && !fainted) {
                        // ComposerMON is dead!
                        fainted = true;
                        mainHandler('playerFaint').then((result) => {
                            playerAliveArray[playerSelectedIndex] = false;
                            let stillInTheGame = false;
                            for (let i = 0; i < 3; i++) {
                                if (playerAliveArray[i]) {
                                    stillInTheGame = true;
                                    playerSelectedIndex = i;
                                    mainHandler('playerSend');
                                    break;
                                }
                            }
                            if (!stillInTheGame) {
                                // end game
                                window.alert("YOU LOSE!!!");
                                endGame('loss');
                            }
                        });
                    }
                }
            }, 50 * i);
        }
        setTimeout(() => {
            resolve();
        }, 51 * dmg);
    });
}

function enemyHealthHandler(dmg, mult) {
    return new Promise((resolve, reject) => {
        let hpbar = document.getElementById('b-enemy-hp');
        enemyHPArr[enemySelectedIndex] = enemyHPArr[enemySelectedIndex] - dmg;
        let fainted = false;
        for (let i = 0; i < dmg; i++) {
            setTimeout(() => {
                if (hpbar.value <= 100 && hpbar.value > 0) {
                    if (mult == -1) {
                        hpbar.value = hpbar.value + 1;
                    } else {
                        hpbar.value = hpbar.value - 2;
                    }
                    if (hpbar.value <= 0 && !fainted) {
                        // ComposerMON is dead!
                        fainted = true;
                        mainHandler('enemyFaint').then((result) => {
                            enemyAliveArray[enemySelectedIndex] = false;
                            let stillInTheGame = false;
                            for (let i = 0; i < 3; i++) {
                                if (enemyAliveArray[i]) {
                                    stillInTheGame = true;
                                    enemySelectedIndex = i;
                                    mainHandler('enemySend');
                                    break;
                                }
                            }
                            if (!stillInTheGame) {
                                // end game
                                window.alert("YOU WIN!!!");
                                endGame('win');
                            }
                        });
                    }
                } 
            }, 50 * i);
        }
        setTimeout(() => {
            resolve();
        }, 51 * dmg);
    })
}