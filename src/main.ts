/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
const backToWaitingRoomBtnName = 'backToWaitingRoomBtn';

async function getPlayers(): Promise<Set<string>> {
    let players = await WA.state.loadVariable('players') as string[];
    if (!players) {
        console.log('No players found, initializing to an empty array.');
        players = [];
        await WA.state.saveVariable('players', players);
    }
    return new Set(players);
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.player.onPlayerMove(event => {
        if(!WA.player.state.isTilePlaced){

            console.log({x: event.x / 32, y: event.y / 32, tile: Number(WA.state.tileColor), layer: "transparent"});
            WA.room.setTiles([
                {
                    x: Math.round(event.x / 32),
                    y: Math.round(event.y / 32),
                    tile: Number(WA.state.tileColor),
                    layer: "transparent"
                },
            ])
            WA.player.state.isTilePlaced = true;

            WA.state.onVariableChange('map').subscribe((value) => {
                WA.room.setTiles([
                    {
                        x: value.x,
                        y: value.y,
                        tile: value.tile,
                        layer: "transparent"
                    },
                ])
                console.log('Variable "map" changed. New value: ', value);
            });

            WA.state.saveVariable('map', {
                'x': Math.round(event.x / 32),
                'y': Math.round(event.y / 32),
                tile: Number(WA.state.tileColor),
            }).catch(e => console.error('Something went wrong while saving variable', e));
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
        imageSrc: 'https://www.iconsdb.com/icons/preview/white/square-rounded-xxl.png',
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

    WA.ui.actionBar.addButton({
        id: backToWaitingRoomBtnName,
        label: 'Waiting Room',
        callback: async (_event) => {
            WA.nav.goToRoom('./map.tmj');
        }
    });  

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


export {};