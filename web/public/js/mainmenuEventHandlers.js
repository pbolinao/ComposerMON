let playOverlay,
    howToPlayOverlay,
    aboutOverlay

function playClicked() {
    playOverlay = document.getElementById(playOverlayID);
    playOverlay.style.display = 'flex';
}

function howToPlayClicked() {
    howToPlayOverlay = document.getElementById(howToPlayOverlayID);
    howToPlayOverlay.style.display = 'flex';
}

function aboutClicked() {
    aboutOverlay = document.getElementById(aboutOverlayID);
    aboutOverlay.style.display = 'flex';
}