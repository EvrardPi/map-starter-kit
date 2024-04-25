/// <reference types="@workadventure/iframe-api-typings" />

import countdown from 'countdown';

console.log('Script started successfully');
const countdownElement = document.getElementById('countdown') as HTMLDivElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Countdown Ready');

    const now = new Date();
    const endTime = new Date(now.getTime() + 10000);
    countdown.setLabels(
        'ms|s|m|h|j||||||',
        'ms|s|m|h|j||||||',
        ' ',
        ' ',
        'fin');

    let placeTileCountdown = countdown(
        endTime,
        function(ts) {
            if (ts.value >= 0) {
                countdownElement.innerHTML = "<strong>Place a new tile</strong>";
                WA.player.state.isTilePlaced = false;

            } else {
                countdownElement.innerHTML = "Place a new tile in : " + ts.toHTML("strong");
            }
        },
        countdown.MINUTES|countdown.SECONDS
    );

}).catch(e => console.error(e));

export {};