

function setupBattleUIHandlers() {
    // Main (right side) buttons
    let fightBTN = document.getElementById("fight-btn"),
        bagBTN = document.getElementById("bag-btn"),
        swapBTN = document.getElementById("swap-btn"),
        quitBTN = document.getElementById("quit-btn"),
        mainBox = document.getElementById("player-selection-main"),
        backBox = document.getElementById("player-select-back"),
        quitBox = document.getElementById("player-quit-confirm"),
        // response buttons
        backBTN = document.getElementById("back-btn"),
        quitYBTN = document.getElementById("quit-yes"),
        quitNBTN = document.getElementById("quit-no");
    
    // Displays to hide/show
    let infoPopup = document.getElementById("player-text-info"),
        attacksPopup = document.getElementById("player-attacks"),
        bagPopup = document.getElementById("player-bag"),
        swapPopup = document.getElementById("player-swap-composer"),
        quitPopup = document.getElementById("player-quit-prompt");

    fightBTN.addEventListener("click", function() {
        swapMainText(attacksPopup, infoPopup, bagPopup, swapPopup, quitPopup, mainBox, quitBox, backBox);
    });
    bagBTN.addEventListener("click", function() {
        swapMainText(bagPopup, infoPopup, attacksPopup, swapPopup, quitPopup, mainBox, quitBox, backBox);
    });
    swapBTN.addEventListener("click", function() {
        swapMainText(swapPopup, infoPopup, attacksPopup, bagPopup, quitPopup, mainBox, quitBox, backBox);
    });
    quitBTN.addEventListener("click", function() {
        swapMainText(quitPopup, infoPopup, attacksPopup, bagPopup, swapPopup, mainBox, backBox, quitBox);
    });
    backBTN.addEventListener("click", function() {
        swapMainText(infoPopup, attacksPopup, bagPopup, swapPopup, quitPopup, backBox, quitBox, mainBox);
    });
    quitNBTN.addEventListener("click", function() {
        swapMainText(infoPopup, attacksPopup, bagPopup, swapPopup, quitPopup, backBox, quitBox, mainBox);
    });
    quitYBTN.addEventListener("click", function() {quitGame();});
}

function swapMainText(focus, i, x, y, z, rightHide1, rightHide2, rightShow) {
    focus.style.display = "inline";
    i.style.display = "none";
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";

    rightHide1.style.display = "none"
    rightHide2.style.display = "none"
    rightShow.style.display = "flex"
}

function backToMainInfo() {
    // Main (right side) buttons
    let mainBox = document.getElementById("player-selection-main"),
        backBox = document.getElementById("player-select-back"),
        quitBox = document.getElementById("player-quit-confirm");
    
    // Displays to hide/show
    let infoPopup = document.getElementById("player-text-info"),
        attacksPopup = document.getElementById("player-attacks"),
        bagPopup = document.getElementById("player-bag"),
        swapPopup = document.getElementById("player-swap-composer"),
        quitPopup = document.getElementById("player-quit-prompt");
    swapMainText(infoPopup, attacksPopup, bagPopup, swapPopup, quitPopup, backBox, quitBox, mainBox);
}

function quitGame() {
    console.log("game quit")
    endGame('quit');
}