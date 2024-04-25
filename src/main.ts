/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.player.onPlayerMove(event => {
        if(!WA.player.state.isTilePlaced){
            console.log({x: event.x / 32, y: event.y / 32, tile: Number(WA.player.state.tileColor), layer: "transparent"});
            WA.room.setTiles([
                {
                    x: Math.round(event.x / 32),
                    y: Math.round(event.y / 32),
                    tile: Number(WA.player.state.tileColor),
                    layer: "transparent"
                },
            ])
            WA.player.state.isTilePlaced = true;
        }       
    });

    const timer = WA.ui.website.open({
        url: "./src/html/countdown.html",
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {
            height: "10vh",
            width: "90vw",
        },
        margin: {
            top: "5vh",
        },
        allowApi: true,
    });    

    WA.ui.actionBar.addButton({
        id: 'choose-tile-color-btn',
        type: 'action',
        imageSrc: '../public/images/tileIcon.png',
        toolTip: 'Select tile color',
        callback: async () => {
            await WA.ui.website.open({
                url: "./src/html/colors.html",
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                size: {
                    height: "30vh",
                    width: "80vw",
                },
                margin: {
                    top: "77vh",
                },
                allowApi: true,
            });
        }
    });
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
