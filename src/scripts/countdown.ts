/// <reference types="@workadventure/iframe-api-typings" />

import countdown from 'countdown';

console.log('Script started successfully');
const countdownElement = document.getElementById('countdown') as HTMLDivElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Countdown Ready');

    const now = new Date();
    const endTime = new Date(now.getTime() + 3 * 60000);
    countdown.setLabels(
        'ms|s|m|h|j||||||',
        'ms|s|m|h|j||||||',
        ' ',
        ' ',
        'maintenant');

    countdown(endTime,
        function(ts) {
            countdownElement.innerHTML = ts.toHTML("strong");
        },
        countdown.MINUTES|countdown.SECONDS
    );

}).catch(e => console.error(e));

export {};