
import {bootstrapExtra} from "@workadventure/scripting-api-extra";
import {Popup} from "@workadventure/iframe-api-typings";
import {closePopup, onClock, onPlayerInside, onPlayerOutside, onPlayerSpawn} from "./events";
import { ObjectWaitingRoom } from "./objectWaitingRoom";

let clockPopUp: Popup;
const startGameBtnName = 'startGameBtn';

async function getPlayers(): Promise<Set<string>> {
    if (!WA.state.loadVariable('players')) { // moi j'ai mis une variable sur la carte
        console.log('players not found, go undefined')
        await WA.state.saveVariable('players', [])
    }

    const res = WA.state.loadVariable('players') as string[] || []
    return new Set(res)
}

WA.onInit().then(async () => {

    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');
    console.log('Script started successfully');

    // si leur code galère ici ca va bloquer
    // await getPlayers()
    // sound
    // const paralysedSound = WA.sound.loadSound('../../public/sound/waitingRoom.wav')
    // paralysedSound.play({loop: true})

    onPlayerSpawn(WA.player);
    // onPlayerInside(ObjectWaitingRoom.INSIDE, async () => {
    //     if (!WA.player.uuid) {
    //         console.error('Player UUID not found');
    //         return;
    //     }

    //     WA.room.hideLayer(ObjectWaitingRoom.WALLS);
    //     // WA.event.broadcast('playerInside', WA.player.uuid);
    //     const players = await getPlayers()
    //     players.add(WA.player.uuid)
    //     await WA.state.saveVariable('players', Array.from(players))
    //     // WA.event.broadcast('players', Array.from(getPlayers()))
    // });
    // onPlayerOutside(ObjectWaitingRoom.OUTSIDE, async () => {
    //     if (!WA.player.uuid) {
    //         console.error('Player UUID not found');
    //         return;
    //     }

    //     WA.room.showLayer(ObjectWaitingRoom.WALLS);
    //     // WA.event.broadcast('playerOutside', WA.player.uuid);

    //     const players = await getPlayers()
    //     players.delete(WA.player.uuid)

    //     await WA.state.saveVariable('players',  Array.from(players))
    //     // WA.event.broadcast('players', Array.from(getPlayers()))
    // });

    // WA.event.on('teleportPlayer').subscribe(async (ev) => {
    //     if (WA.player.uuid === ev.data) {
    //         // random delay from 1 to 5 seconds
    //         const delay = Math.floor(Math.random() * 2) + 1;
    //         await new Promise((resolve) => setTimeout(resolve, delay * 300));
    //         WA.nav.goToRoom('../maps/cds.tmj');
    //     }
    // })
    onClock(clockPopUp)

    WA.ui.actionBar.addButton({
        id: startGameBtnName,
        label: 'Start game',
        callback: async (_event) => {
            // if ((await getPlayers()).size < 2) {
            //     const popup = WA.ui.openPopup('popup', 'You need at least 2 players to start the game', []);
            //     setTimeout(() => closePopup(popup), 2000)
            //     return;
            // }

            // // TELEPORT TO ROOM
            // for (const player of Array.from((await getPlayers()).values())) {
            //     console.log("teleport", player)
            //     WA.event.broadcast('teleportPlayer', player)
            // }
        }
    });

    WA.ui.actionBar.addButton({
        id: "salut mec",
        label: 'tu passes par qui ?',
        callback: async (_event) => {
            console.log("je passe par feneu");
        }
    });

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


export {};
