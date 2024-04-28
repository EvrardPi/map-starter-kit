import {bootstrapExtra} from "@workadventure/scripting-api-extra";
import {onPlayerSpawn} from "./events";

//const startGameBtnName = 'startGameBtn';
// const backToWaitingRoomBtnName = 'backToWaitingRoomBtn';
const openBarBtnName = 'openBarBtn';

// get the list of players
async function getPlayers(): Promise<Set<string>> {
    let players = await WA.state.loadVariable('players') as string[];
    if (!players) {
        console.log('No players found, initializing to an empty array.');
        players = [];
        await WA.state.saveVariable('players', players);
    }
    return new Set(players);
}

// add or remove a player from the list of players
function updatePlayers(add: boolean, uuid: string) {
    getPlayers().then(players => {
        if (add) {
            players.add(uuid);
            console.log(`Player added: ${uuid}`);
        } else {
            players.delete(uuid);
            console.log(`Player removed: ${uuid}`);
        }
        WA.state.saveVariable('players', Array.from(players)).then(() => {
            console.log(`Updated players list: ${Array.from(players)}`);
        });
    });
}

WA.onInit().then(async () => {
    console.log('Script started successfully.');
    onPlayerSpawn(WA.player);
    console.log("Player spawn detected:", WA.player.uuid);

    // add the player to the list of players
    if (WA.player.uuid) {
        updatePlayers(true, WA.player.uuid);
    }

    WA.event.on('teleportPlayer').subscribe(async (ev) => {
        if (WA.player.uuid === ev.data) {
            const delay = Math.floor(Math.random() * 4) + 1;
            await new Promise((resolve) => setTimeout(resolve, delay * 300));
            WA.nav.goToRoom('./map_gold.tmj');
            console.log("Teleported player:", WA.player.uuid);
        }
    });

    WA.event.on('backTeleportPlayer').subscribe(async (ev) => {
        if (WA.player.uuid === ev.data) {
            const delay = Math.floor(Math.random() * 4) + 1;
            await new Promise((resolve) => setTimeout(resolve, delay * 300));
            WA.nav.goToRoom('./map.tmj');
            console.log("Teleported player:", WA.player.uuid);
        }
    });

    // // button to teleport all players to the game room
    // WA.ui.actionBar.addButton({
    //     id: startGameBtnName,
    //     label: 'Start game',
    //     callback: async (_event) => {
    //         const players = await getPlayers();
    //         console.log("Ready to teleport:", Array.from(players));
    //         for (const player of players) {
    //             console.log("Teleporting player:", player);
    //             WA.event.broadcast('teleportPlayer', player);
    //         }
    //     }
    // });

    // button to open the bar page
    WA.ui.actionBar.addButton({
        id: openBarBtnName,
        label: 'Maps',
        callback: () => {
            WA.ui.website.open({
                url: "./src/bar/bar.html",
                position: {
                    vertical: "middle",
                    horizontal: "middle",
                },
                size: {
                    height: "80vh",
                    width: "50vh",
                },
                margin: {
                    right: "12px",
                },
                allowApi: true,
            });
            console.log("Bar page opened");
        }
    });   

    // button to teleport all players back to the waiting room
    // WA.ui.actionBar.addButton({
    //     id: backToWaitingRoomBtnName,
    //     label: 'Waiting Room',
    //     callback: async (_event) => {
    //         const players = await getPlayers();
    //         console.log("Teleporting all players back to the waiting room:", Array.from(players));
    //         for (const player of players) {
    //             console.log("Teleporting player:", player);
    //             WA.event.broadcast('backTeleportPlayer', player);
    //         }
    //     }
    // });

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready.');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

export {};
