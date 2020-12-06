
function backToMainMenu() {
    window.location.replace('../index.html');
}


function endGame(end) {
    let battleCont = document.getElementById('battle-container'),
        endCont = document.getElementById('end-container'),
        shortMSG = document.getElementById('end-short-message'),
        longMSG = document.getElementById('end-long-message');
    
    if (end == 'win') {
        shortMSG.innerHTML = "YOU WIN!";
        longMSG.innerHTML = "What an incredible battle! This fight will be remembered throughout history forever!";
    } else if (end == 'lose') {
        shortMSG.innerHTML = "You lost!";
        longMSG.innerHTML = "Well... Better luck next time!";
    } else if (end == 'quit') {
        ws.send(JSON.stringify({
            meta: 'quit'
        }))
        shortMSG.innerHTML = "You quit...";
        longMSG.innerHTML = "No worries, not like they could take you on anyways!";
    } else if (end == 'quitW') {
        shortMSG.innerHTML = "Your opponent disconnected...";
        longMSG.innerHTML = "Tough luck, guess you scared them away!";
    }

    battleCont.style.opacity = '0';
    setTimeout(() => {
        endCont.style.display = 'block';
        endCont.style.opacity = '1';
        setTimeout(() => {
            battleCont.style.display = 'none';
        }, 500);
    }, 250)
}