/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.player.state.canPlaceTile = true;

    WA.player.onPlayerMove(event => {
        console.log(WA.player.state.canPlaceTile);
        if(WA.player.state.canPlaceTile && WA.player.state.tileColor){
            console.log({x: event.x / 32, y: event.y / 32, tile: Number(WA.player.state.tileColor), layer: "transparent"});
            WA.room.setTiles([
                {
                    x: Math.round(event.x / 32),
                    y: Math.round(event.y / 32),
                    tile: Number(WA.player.state.tileColor),
                    layer: "transparent"
                },
            ])
            WA.player.state.canPlaceTile = false;
        }       
    });
    
    WA.ui.actionBar.addButton({
        id: 'choose-tile-color-btn',
        type: 'action',
        imageSrc: 'public/images/tileIcon.png',
        toolTip: 'Select tile color',
        callback: async () => {
            if(!WA.player.state.canPlaceTile) return;

            const colorPopup = await WA.ui.website.open({
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

            let interval: any;
            WA.player.state.onVariableChange('tileColor')
            .subscribe((value) => {
                if(value) colorPopup.close();
            })

            WA.player.state.onVariableChange('canPlaceTile')
            .subscribe((value) => {
                if(!value) {
                    colorPopup.close();
                    let countdown = 10;
                    interval = setInterval(() => {
                        WA.ui.banner.openBanner({
                            id: "countdown-banner",
                            text: `Place a new tile in ${countdown}s`,
                            bgColor: "#56EAFF",
                            textColor: "#000000",
                            timeToClose: 1000,
                        });
                        countdown--;
                        if(countdown === 0) { 
                            clearInterval(interval);
                            WA.player.state.canPlaceTile = true;
                            WA.player.state.tileColor = null;
                        }
                    }, 1000);
                } else clearInterval(interval);
            })         
        }
    });
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
