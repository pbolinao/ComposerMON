let numComp = 3;

window.onload = function() {
    // load the game info in via API

    // only run this when the battle is actually ready 
    setupBattleUIHandlers();

    let selectableComposers = document.querySelectorAll(".composer-cell");
    for (let i = 0; 0 < selectableComposers.length; i++) {
        let composer = selectableComposers[i],
            id = composer.id;
        composer.addEventListener("mouseover", function() {composerHover(id)})
        composer.addEventListener("mouseleave", function() {composerUnHover()})
    }
}

function composerHover(hoverID) {
    // this function will change the ComposerMON viewed for the client
    let id = "p1-chosenimg-1"
    document.getElementById(id).src = document.getElementById(hoverID).querySelector("img").src;
}
function composerUnHover() {
    let id = "p1-chosenimg-1"
    document.getElementById(id).src = ""; // maybe create a blank image to take its place
}

function composerSelect(player, spotToStore) {
    // onclick listener for when the composer is clicked in the center
    // player will be a variable from local storage (could probably remove it as a parameter later)

    // spotToStore represents the position in the team that this composer should be added in
    // it also refers to which div the composer should be added to
}

function chosenReselect() {
    // When a composer chosen div is clicked this function will run
    // Empty out whatever composer exists in the div
    // set this div as the current selection div
}

function readyHover() {
    // check if the player hovering it is the player related to this button
    // if it is then cursor pointer and color white
    // also make it clickable
}

function readyClick() {
    // onclick handler for the ready button
}

function startBattle() {
    
}