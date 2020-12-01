let playOverlay,
    recentOverlay,
    aboutOverlay,
    mmItems

function establishMMHandlers() {
    playOverlay = document.getElementById(playOverlayID);
    recentOverlay = document.getElementById(recentOverlayID);
    aboutOverlay = document.getElementById(aboutOverlayID);
    mmItems = document.getElementById(mmItemsID);
}

function playClicked() {
    mmItems.style.display = 'none';
    playOverlay.style.display = 'flex';
}

function recentClicked() {
    mmItems.style.display = 'none';
    recentOverlay.style.display = 'flex';
}

function aboutClicked() {
    mmItems.style.display = 'none';
    aboutOverlay.style.display = 'flex';
}

function closeClicked() {
    mmItems.style.display = 'inline';
    playOverlay.style.display = 'none';
    recentOverlay.style.display = 'none';
    aboutOverlay.style.display = 'none';
}