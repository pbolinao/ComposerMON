let numComp = 3;

let selectImageIDList,
    bsImageIDList1,
    selectNameIDList,
    bsNameIDList1,
    enemyImageIDs,
    bsImageIDList2,
    enemyNameIDs,
    bsNameIDList2,
    currentlySelected = [false, false, false],
    current = 0,
    ourReadyButton,
    theirReadyButton,
    ourTeamDiv,
    theirTeamDiv,
    composerTeamIDs = [],
    composerTeamNames = [];

function setupComposerSelect() {
    let selectionBoxes;
    if (player == 1) {
        selectImageIDList = ['p1-chosenimg-1', 'p1-chosenimg-2', 'p1-chosenimg-3'];
        selectNameIDList = ['p1-chosen-name-1', 'p1-chosen-name-2', 'p1-chosen-name-3'];
        bsImageIDList1 = ['bs-p1-img-1', 'bs-p1-img-2', 'bs-p1-img-3'];
        bsNameIDList1 = ['bs-p1-name-1', 'bs-p1-name-2', 'bs-p1-name-3'];
    
        enemyImageIDs = ['p2-chosenimg-1', 'p2-chosenimg-2', 'p2-chosenimg-3'];
        enemyNameIDs = ['p2-chosen-name-1', 'p2-chosen-name-2', 'p2-chosen-name-3'];
        bsImageIDList2 = ['bs-p2-img-1', 'bs-p2-img-2', 'bs-p2-img-3'];
        bsNameIDList2 = ['bs-p2-name-1', 'bs-p2-name-2', 'bs-p2-name-3']
        document.getElementById('cs-p2-chosen').style.pointerEvents = 'none';

        document.getElementById('p1-player-name').innerHTML = playerName;
        document.getElementById('bs-p1-name').innerHTML = playerName;
        document.getElementById('p2-player-name').innerHTML = enemyName;
        document.getElementById('bs-p2-name').innerHTML = enemyName;
        
        selectionBoxes = document.querySelectorAll('#cs-p1-chosen .chosen-div');

        ourReadyButton = document.getElementById('p1-ready-btn');
        ourTeamDiv = document.getElementById('cs-p1-chosen');
        theirReadyButton = document.getElementById('p2-ready-btn');
        theirTeamDiv = document.getElementById('cs-p2-chosen');
        theirReadyButton.style.pointerEvents = 'none';
    } else if (player == 2) {
        selectImageIDList = ['p2-chosenimg-1', 'p2-chosenimg-2', 'p2-chosenimg-3'];
        selectNameIDList = ['p2-chosen-name-1', 'p2-chosen-name-2', 'p2-chosen-name-3'];
        bsImageIDList1 = ['bs-p2-img-1', 'bs-p2-img-2', 'bs-p2-img-3'];
        bsNameIDList1 = ['bs-p2-name-1', 'bs-p2-name-2', 'bs-p2-name-3']

        enemyImageIDs = ['p1-chosenimg-1', 'p1-chosenimg-2', 'p1-chosenimg-3'];
        enemyNameIDs = ['p1-chosen-name-1', 'p1-chosen-name-2', 'p1-chosen-name-3'];
        bsImageIDList2 = ['bs-p1-img-1', 'bs-p1-img-2', 'bs-p1-img-3'];
        bsNameIDList2 = ['bs-p1-name-1', 'bs-p1-name-2', 'bs-p1-name-3'];
        document.getElementById('cs-p1-chosen').style.pointerEvents = 'none';

        document.getElementById('p1-player-name').innerHTML = enemyName;
        document.getElementById('bs-p1-name').innerHTML = enemyName;
        document.getElementById('p2-player-name').innerHTML = playerName;
        document.getElementById('bs-p2-name').innerHTML = playerName;

        selectionBoxes = document.querySelectorAll('#cs-p2-chosen .chosen-div');
        
        ourReadyButton = document.getElementById('p2-ready-btn');
        ourTeamDiv = document.getElementById('cs-p2-chosen');
        theirReadyButton = document.getElementById('p1-ready-btn');
        theirTeamDiv = document.getElementById('cs-p1-chosen');
        theirReadyButton.style.pointerEvents = 'none';
    } 

    for (let i = 0; i < 3; i++) {
        selectionBox = selectionBoxes[i];
        selectionBox.addEventListener('click', function() { chosenReselect(i) });
    }
}

function composerHover(hoverID) {
    // this function will change the ComposerMON viewed for the client
    let imgID, nameID;
    if (currentlySelected[current]) {
        for (let i = 0; i < 3; i++) {
            if (!currentlySelected[i]) {
                imgID = selectImageIDList[i];
                nameID = selectNameIDList[i];
                current = i;
                break;
            } 
        }
    } else {
        imgID = selectImageIDList[current];
        nameID = selectNameIDList[current];
    }
    if (current < 3) {
        let composer = document.getElementById(hoverID);
        document.getElementById(imgID).src = composer.querySelector("img").src;
        document.getElementById(nameID).innerHTML = composer.querySelector("img").alt;
    }
}

function composerUnHover() {
    if (current < 3) {
        if (!currentlySelected[current]) {
            let imgID = selectImageIDList[current];
            let nameID = selectNameIDList[current];
            document.getElementById(imgID).src = "../images/empty.png";
            document.getElementById(nameID).innerHTML = "--";
        }
    }
}

function composerSelect(clickID) {
    if (current < 3) {
        imgID = selectImageIDList[current];
        nameID = selectNameIDList[current];
        let composer = document.getElementById(clickID);
        document.getElementById(imgID).src = composer.querySelector("img").src;
        document.getElementById(bsImageIDList1[current]).src = composer.querySelector("img").src;
        document.getElementById(nameID).innerHTML = composer.querySelector("img").alt;
        document.getElementById(bsNameIDList1[current]).innerHTML = composer.querySelector("img").alt;
        currentlySelected[current] = true;
        composerTeamIDs[current] = clickID;
        composerTeamNames[current] = composer.querySelector("img").alt;
        ws.send(JSON.stringify({
            meta: "team-update",
            teamID: teamID,
            enemyTeamID: enemyTeamID,
            position: current,
            composerID: clickID
        }))

        current++;
    }
}

function chosenReselect(boxNum) {
    // When a composer chosen div is clicked this function will run
    // Empty out whatever composer exists in the div
    // set this div as the current selection div
    current = boxNum
    currentlySelected[boxNum] = false;
    let imgID = selectImageIDList[boxNum];
    let nameID = selectNameIDList[boxNum];
    document.getElementById(imgID).src = "../images/empty.png";
    document.getElementById(nameID).innerHTML = "--";
}

function readyClick() {
    let goodToGo = true;
    for (let i = 0; i < 3; i++) {
        if (!currentlySelected[i]) {
            goodToGo = false;
        }
    }
    if (goodToGo) {
        ourTeamDiv.style.animation = 'glow-hover 0.75s ease-in-out infinite alternate';
        fetch(httpServerURL + "/createTeam", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'JWT '+ window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                teamID: teamID,
                composer1: composerTeamNames[0], composer1Id: composerTeamIDs[0],
                composer2: composerTeamNames[1], composer2Id: composerTeamIDs[1],
                composer3: composerTeamNames[2], composer3Id: composerTeamIDs[2]
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            playerTeam = [
                {id: composerTeamIDs[0], name: composerTeamNames[0]},
                {id: composerTeamIDs[1], name: composerTeamNames[1]},
                {id: composerTeamIDs[2], name: composerTeamNames[2]}
            ]
            ws.send(JSON.stringify({
                meta: "ready",
                teamID: teamID,
                enemyTeamID: enemyTeamID
            }));
            ready = true;
            readyCheck();
        }).catch(e => {
            console.log(e)
        });
    } else {
        window.alert("You must pick 3 composers!");
    }
}

function startBattle() {
    
}